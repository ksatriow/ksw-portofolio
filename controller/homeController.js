const { Certificate, Project } = require('../models');
const fs = require('fs');
module.exports = {
  // index:(req,res) => res.render('./home')
  index: async (req, res) => {
    try {
      const pPage = parseInt(req.query.projectPage) || 1;
      const cPage = parseInt(req.query.certPage) || 1;
      const pLimit = 4;
      const cLimit = 6;

      const { count: countCert, rows: certificate } = await Certificate.findAndCountAll({
        limit: cLimit,
        offset: (cPage - 1) * cLimit,
        order: [['id', 'DESC']]
      });

      const { count: countProj, rows: projects } = await Project.findAndCountAll({
        limit: pLimit,
        offset: (pPage - 1) * pLimit,
        order: [['id', 'DESC']]
      });

      const totalProjectPages = Math.ceil(countProj / pLimit);
      const totalCertPages = Math.ceil(countCert / cLimit);

      res.render("./home", {
        certificate, projects,
        pPage, cPage, totalProjectPages, totalCertPages
      });
    } catch (e) {
      console.log(e);
      res.render("./home", {
        certificate: [], projects: [],
        pPage: 1, cPage: 1, totalProjectPages: 0, totalCertPages: 0
      });
    }
  },
}