const { Certificate } = require("../models");

module.exports = {
  index: (req, res) => {
    Certificate.findAll({}).then((article) => {
      res.render("./cms/index", { article });
    });
  },
  create: (req, res) => res.render("./cms/create"),
  doCreate: (req, res) => {
    const { title, description } = req.body;

    Certificate.create({
      title,
      description,
    }).then((article) => {
      res.render("./cms/index", { article });
    });
  },
  update: (req, res) => res.render("./cms/update/", { article }),
  doUpdate: (async (req, res) => {
    // // cara 1
    // const { title, description } = req.body;
    // const userId = req.params.id;
    // const query = {
    //   where: { id: userId },
    // };
    // Certificate.update({ title, description }, query)
    //   .then(() => {
    //     // req.flash('success', 'Book successfully updated');
    //     // res.redirect('./cms');
    //     res.status(201).json("Update succesfully");
    //   })
    //   .catch((err) => {
    //     res.status(422).json("Can't update book");
    //   });
    try {
      const { title, description } = req.body;
      const userId = req.params.id;
      const query = {
        where: { id: userId },
      };

      const project = await Certificate.update(
        {
          title: title,
          description: description,
        },
        query
      );
      return res.redirect('/cms/update/' + userId);
    } catch (error) {
      console.log(error)
      // return res.redirect('/cms/update/'+req.params.id);
    }
  }),
  delete: (req, res) => res.render("./cms/delete"),
  doDelete: (req, res) => {
    const userId = req.params.id;

    Certificate.destroy({
      where: { id: userId },
    })
      .then((data) => {
        res.json({
          status: 200,
          message: "DATA BERHASIL DIHAPUS",
          data: userId,
        });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: "DATA GAGAL DIHAPUS",
        });
      });
  },
  detail: (req, res) => {
    const articleId = req.params.id;

    Certificate.findOne({
      where: { id: articleId },
    })
      .then((article) => {
        res.render("./cms/update", { article });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: "data tidak ditemukan",
        });
      });
  },
};
