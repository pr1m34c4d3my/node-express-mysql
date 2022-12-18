let { Subject } = require("../models");

const Validator = require("fastest-validator");
const V = new Validator();

module.exports = {
  getSubjects: async (req, res) => {
    const SUBJECTS = await Subject.findAll({ attributes: ["id", "name"] });
    res.json(SUBJECTS);
  },

  getSubjectById: async (req, res) => {
    const ID = req.params.id;
    const SUBJECT = await Subject.findByPk(ID);

    if (!SUBJECT) {
      res.status(404).json({
        message: "Subject not found",
      });
    } else {
      res.json(SUBJECT);
    }
  },

  createSubject: async (req, res) => {
    const SCHEMA = {
      name: "string",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);
    if (VALIDATE.length) {
      res.status(400).json(VALIDATE);
    }

    const SUBJECT = await Subject.create(req.body);
    res.status(200).json({
      message: "Successfully created a subject",
      method: req.method,
      data: SUBJECT,
    });
  },

  updateSubject: async (req, res) => {
    const ID = req.params.id;
    let subject = await Subject.findByPk(ID);

    if (!subject) {
      res.status(404).json({ message: "Subject not found" });
    }

    const SCHEMA = {
      name: "string|optional",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);
    if (VALIDATE.length) {
      res.status(400).json(VALIDATE);
    }

    let update = await subject.update(req.body);
    res.json({
      message: "Subject has been updated",
      method: req.method,
      data: update,
    });
  },

  deleteSubject: async (req, res) => {
    const ID = req.params.id;
    let subject = await Subject.findByPk(ID);

    if (!subject) {
      res.status(404).json({
        message: "Subject not found",
      });
    }

    subject = await subject.destroy();
    res.json({
      message: "Subject has been deleted",
      method: req.method,
      data: subject,
    });
  },
};
