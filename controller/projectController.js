const { Project } = require("../models");

module.exports = {
  index: (req, res) => {
    Project.findAll({
    }).then(article => {
        if (article.length !== 0 ) {
            res.render('./project/index', {article})
        } else {
            res.json({
                'status': 400,
                'message': 'data kosong'
            })
        }
    })
},
  create: (req, res) => {
    const { title, description } = req.body;

    Project.create({
      title,
      description,
    }).then((article) => {
      res.render('./project/detail', {article})
    })
  },
  update: (req, res) => {
    const userId = req.params.id;
    const query = {
      where: { id: userId },
    };

    Project.update(
      {
        approved: true,
      },
      query
    )
      .then((data) => {
        res.json({
          status: 200,
          message: "berhasil diupdate",
          data: userId,
        });
        // process.exit() // matikan server
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: "data gagal diupdate",
        });
      });
  },
  show: (req, res) => {
    const articleId = req.params.id;

    Project.findOne({
        where: {id: articleId}
    }).then(article => {
        res.render('./project/detail', {article})
    }).catch(err => {
        res.json({
            'status': 400,
            'message': 'data tidak ditemukan'
        })
    })
  },
  delete: (req, res) => {
    const userId = req.params.id;

    Project.destroy({
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
  createArticle:(req, res) => {
    res.render('./project/create')
  },
  detail: (req, res) => {
    const articleId = req.params.id;

    Project.findOne({
        where: {id: articleId}
    }).then(article => {
        res.render('./project/detail', {article})
    }).catch(err => {
        res.json({
            'status': 400,
            'message': 'data tidak ditemukan'
        })
    })
},
};
