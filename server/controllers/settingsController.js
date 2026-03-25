const Setting = require("../models/Settings");

// GET ALL SETTINGS
exports.getSettings = async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD LOGO
exports.uploadLogo = async (req, res) => {
  try {
    const logo = req.file.filename;

    let setting = await Setting.findOne();

    if (!setting) {
      setting = new Setting({ logo });
    } else {
      setting.logo = logo;
    }

    await setting.save();

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PHONE NUMBER
exports.updatePhone = async (req, res) => {
  try {
    const { phone } = req.body;

    let setting = await Setting.findOne();

    if (!setting) {
      setting = new Setting({ phone });
    } else {
      setting.phone = phone;
    }

    await setting.save();

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
