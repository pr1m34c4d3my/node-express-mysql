let { User } = require("../models");

const Validator = require("fastest-validator");
const V = new Validator();

module.exports = {
  getUsers: async (req, res) => {
    const USERS = await User.findAll({ attributes: ["id", "name", "email"] });
    res.status(200).json(USERS);
  },

  getUserById: async (req, res) => {
    const ID = req.params.id;
    const USER = await User.findByPk(ID);

    if (!USER) {
      res.status(404).json({
        message: "User Not Found",
      });
    } else {
      res.json(USER);
    }
  },

  createUser: async (req, res) => {
    const SCHEMA = {
      name: "string",
      email: "string",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);
    if (VALIDATE.length) {
      res.status(400).json(VALIDATE);
    }

    const USER = await User.create(req.body);

    res.status(200).json({
      message: "Succesfully Created a User",
      method: req.method,
      data: USER,
    });
  },

  updateUser: async (req, res) => {
    const ID = req.params.id;
    let user = await User.findByPk(ID);

    if (!user) {
      res.status(404).json({
        message: "User Not Found",
      });
    }

    const SCHEMA = {
      name: "string|optional",
      email: "string|optional",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);
    if (VALIDATE.length) {
      res.status(400).json(VALIDATE);
    }

    let updated = await user.update(req.body);
    res.status(200).json({
      status: "OK",
      method: req.method,
      message: "User has been updated",
      data: updated,
    });
  },

  deleteUser: async (req, res) => {
    const ID = req.params.id;
    let user = await User.findByPk(ID);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();
    res.json({
      status: "OK",
      method: req.method,
      message: "User has been deleted",
      data: user,
    });
  },
};
