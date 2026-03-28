const { Certificate, Project } = require('../models');
const fs = require('fs');
module.exports = {
  // index:(req,res) => res.render('./home')
  index: async (req, res) => {
    try {
      const certificate = await Certificate.findAll({});
      const projects = await Project.findAll({});
      res.render("./home", { certificate, projects });
    } catch (e) {
      console.log(e);
      res.render("./home", { certificate: [], projects: [] });
    }
  },
}