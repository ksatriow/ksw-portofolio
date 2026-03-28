const { Project } = require("../models");
const { uploadImage, deleteFile } = require("../library/fileUpload");

module.exports = {
    index: async (req, res) => {
        try {
            const projects = await Project.findAll({});
            res.render("./cms_project/index", { projects });
        } catch (e) {
            res.redirect("/cms");
        }
    },
    create: (req, res) => res.render("./cms_project/create"),
    doCreate: async (req, res) => {
        try {
            const { title, description } = req.body;
            let image_url = null;

            if (req.files && req.files.image) {
                image_url = await uploadImage(req.files.image);
            }

            await Project.create({
                title,
                description,
                image_url,
            });

            res.redirect("/cms/project");
        } catch (e) {
            console.log(e);
            res.redirect("/cms/project/create");
        }
    },
    detail: async (req, res) => {
        try {
            const project = await Project.findOne({ where: { id: req.params.id } });
            res.render("./cms_project/update", { project });
        } catch (e) {
            res.redirect("/cms/project");
        }
    },
    doUpdate: async (req, res) => {
        try {
            const { title, description } = req.body;
            const project = await Project.findByPk(req.params.id);

            let image_url = project.image_url;

            if (req.files && req.files.image) {
                if (project.image_url) {
                    deleteFile(project.image_url);
                }
                image_url = await uploadImage(req.files.image);
            }

            await Project.update(
                { title, description, image_url },
                { where: { id: req.params.id } }
            );
            res.redirect("/cms/project");
        } catch (e) {
            console.log(e);
            res.redirect("/cms/project");
        }
    },
    doDelete: async (req, res) => {
        try {
            const project = await Project.findByPk(req.params.id);
            if (project && project.image_url) {
                deleteFile(project.image_url);
            }
            await Project.destroy({ where: { id: req.params.id } });
            res.redirect("/cms/project");
        } catch (err) {
            res.redirect("/cms/project");
        }
    },
};
