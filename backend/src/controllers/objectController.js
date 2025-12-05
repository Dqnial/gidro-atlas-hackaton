import ObjectModel from "../models/Object.js";

// Список объектов с фильтрацией и поиском
export const getObjects = async (req, res) => {
  try {
    const {
      region,
      resource_type,
      water_type,
      fauna,
      technical_condition,
      name,
    } = req.query;

    let filter = {};
    if (region) filter.region = region;
    if (resource_type) filter.resource_type = resource_type;
    if (water_type) filter.water_type = water_type;
    if (fauna) filter.fauna = fauna === "true";
    if (technical_condition)
      filter.technical_condition = Number(technical_condition);
    if (name) filter.name = { $regex: name, $options: "i" };

    const objects = await ObjectModel.find(filter);
    res.json(objects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Карточка объекта
export const getObjectById = async (req, res) => {
  try {
    const object = await ObjectModel.findById(req.params.id);
    if (!object) return res.status(404).json({ message: "Object not found" });
    res.json(object);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Приоритет объекта
export const getPriority = async (req, res) => {
  try {
    const object = await ObjectModel.findById(req.params.id);
    if (!object) return res.status(404).json({ message: "Object not found" });

    const age = new Date().getFullYear() - object.passport_date.getFullYear();
    const score = (6 - object.technical_condition) * 3 + age;

    let priority;
    if (score >= 12) priority = "High";
    else if (score >= 6) priority = "Medium";
    else priority = "Low";

    res.json({ score, priority });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
