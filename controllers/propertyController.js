import Property from '../models/Property.js';

exports.createProperty = async (req, res) => {
  const { type, location, price, description } = req.body;

  try {
    const newProperty = new Property({
      agent: req.agent.id,
      type,
      location,
      price,
      description,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.agent.id });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProperty = async (req, res) => {
  const { type, location, price, description, status } = req.body;

  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    if (property.agent.toString() !== req.agent.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: { type, location, price, description, status } },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    if (property.agent.toString() !== req.agent.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Property.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.searchProperties = async (req, res) => {
  const { location, priceMin, priceMax, type } = req.query;

  try {
    const query = {
      ...(location && { location: { $regex: location, $options: 'i' } }),
      ...(priceMin && { price: { $gte: priceMin } }),
      ...(priceMax && { price: { $lte: priceMax } }),
      ...(type && { type }),
    };

    const properties = await Property.find(query);
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
