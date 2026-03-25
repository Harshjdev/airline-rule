const Section = require("../models/Section");

exports.uploadSection = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.filename;

    let section = await Section.findOne({ name });

    if (section) {
      section.image = image;
      await section.save();
    } else {
      section = new Section({ name, image });
      await section.save();
    }

    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
};
