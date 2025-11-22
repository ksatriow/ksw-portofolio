const { Project } = require("../models");
const { uploadImage, uploadVideo, deleteFile } = require("../library/fileUpload");

// Validation helper
const validateProject = (title, description) => {
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  }
  if (title && title.length > 100) {
    errors.push("Title must not exceed 100 characters");
  }
  if (!description || description.trim().length < 10) {
    errors.push("Description must be at least 10 characters");
  }
  if (description && description.length > 500) {
    errors.push("Description must not exceed 500 characters");
  }

  return errors;
};

module.exports = {
  // GET /project - List all projects (Public)
  index: async (req, res) => {
    try {
      const projects = await Project.findAll();

      res.json({
        status: 200,
        message: "Projects retrieved successfully",
        data: projects
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve projects",
        error: err.message
      });
    }
  },

  // GET /project/:id - Get single project (Public)
  show: async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findOne({
        where: { id: projectId }
      });

      if (!project) {
        return res.status(404).json({
          status: 404,
          message: "Project not found"
        });
      }

      res.json({
        status: 200,
        message: "Project retrieved successfully",
        data: project
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve project",
        error: err.message
      });
    }
  },

  // POST /project - Create new project (Auth Required)
  create: async (req, res) => {
    try {
      const { title, description } = req.body;

      // Validate input
      const errors = validateProject(title, description);
      if (errors.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Validation failed",
          errors: errors
        });
      }

      let image_url = null;
      let video_url = null;

      // Handle image upload
      if (req.files && req.files.image) {
        try {
          image_url = await uploadImage(req.files.image);
        } catch (err) {
          return res.status(400).json({
            status: 400,
            message: err.message,
            error: err.error || null
          });
        }
      }

      // Handle video upload
      if (req.files && req.files.video) {
        try {
          video_url = await uploadVideo(req.files.video);
        } catch (err) {
          // Clean up already uploaded image if video fails
          if (image_url) deleteFile(image_url);

          return res.status(400).json({
            status: 400,
            message: err.message,
            error: err.error || null
          });
        }
      }

      const project = await Project.create({
        title: title.trim(),
        description: description.trim(),
        image_url,
        video_url
      });

      res.status(201).json({
        status: 201,
        message: "Project created successfully",
        data: project
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to create project",
        error: err.message
      });
    }
  },

  // PUT /project/:id - Update project (Auth Required)
  update: async (req, res) => {
    try {
      const projectId = req.params.id;
      const { title, description } = req.body;

      // Validate input
      const errors = validateProject(title, description);
      if (errors.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Validation failed",
          errors: errors
        });
      }

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({
          status: 404,
          message: "Project not found"
        });
      }

      let image_url = project.image_url; // Keep existing by default
      let video_url = project.video_url; // Keep existing by default

      // Handle image upload (replace old image)
      if (req.files && req.files.image) {
        try {
          // Delete old image if exists
          if (project.image_url) {
            deleteFile(project.image_url);
          }

          image_url = await uploadImage(req.files.image);
        } catch (err) {
          return res.status(400).json({
            status: 400,
            message: err.message,
            error: err.error || null
          });
        }
      }

      // Handle video upload (replace old video)
      if (req.files && req.files.video) {
        try {
          // Delete old video if exists
          if (project.video_url) {
            deleteFile(project.video_url);
          }

          video_url = await uploadVideo(req.files.video);
        } catch (err) {
          return res.status(400).json({
            status: 400,
            message: err.message,
            error: err.error || null
          });
        }
      }

      // Update project
      await Project.update(
        {
          title: title.trim(),
          description: description.trim(),
          image_url,
          video_url
        },
        {
          where: { id: projectId }
        }
      );

      // Fetch updated project
      const updatedProject = await Project.findByPk(projectId);

      res.json({
        status: 200,
        message: "Project updated successfully",
        data: updatedProject
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to update project",
        error: err.message
      });
    }
  },

  // DELETE /project/:id - Delete project (Auth Required)
  delete: async (req, res) => {
    try {
      const projectId = req.params.id;

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({
          status: 404,
          message: "Project not found"
        });
      }

      // Delete associated files
      if (project.image_url) {
        deleteFile(project.image_url);
      }
      if (project.video_url) {
        deleteFile(project.video_url);
      }

      await Project.destroy({
        where: { id: projectId }
      });

      res.json({
        status: 200,
        message: "Project deleted successfully",
        data: { id: projectId }
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to delete project",
        error: err.message
      });
    }
  }
};
