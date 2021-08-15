const { Project } = require('../models');
const fs = require('fs');
module.exports = {
    // index:(req,res) => res.render('./home')
    index: (req, res) => {
        Project.findAll({}).then((certificate) => {
          if (certificate.length !== 0) {
            res.render("./home", { certificate });
          } else {
            res.json({
              status: 400,
              message: "data kosong",
            });
          }
        });
      },
}