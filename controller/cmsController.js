const { Certificate } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const article = await Certificate.findAll({});
      res.render("./cms/index", { article });
    } catch (e) {
      res.redirect("/");
    }
  },
  create: (req, res) => res.render("./cms/create"),
  doCreate: async (req, res) => {
    try {
      const { title, description } = req.body;
      await Certificate.create({ title, description });
      res.redirect("/cms");
    } catch (e) {
      console.log(e);
      res.redirect("/cms/create");
    }
  },
  detail: async (req, res) => {
    try {
      const article = await Certificate.findOne({ where: { id: req.params.id } });
      res.render("./cms/update", { article });
    } catch (e) {
      res.redirect("/cms");
    }
  },
  doUpdate: async (req, res) => {
    try {
      const { title, description } = req.body;
      await Certificate.update(
        { title, description },
        { where: { id: req.params.id } }
      );
      res.redirect("/cms");
    } catch (e) {
      console.log(e);
      res.redirect("/cms");
    }
  },
  doDelete: async (req, res) => {
    try {
      await Certificate.destroy({ where: { id: req.params.id } });
      res.redirect("/cms");
    } catch (err) {
      res.redirect("/cms");
    }
  },
};
