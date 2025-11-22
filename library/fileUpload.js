const path = require('path');
const fs = require('fs');

// Allowed file extensions
const ALLOWED_IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const ALLOWED_VIDEO_EXTS = ['.mp4', '.webm', '.mov'];

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

// Upload directory
const UPLOAD_DIR = path.join(__dirname, '../public/uploads/projects');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Validate and upload image file
 * @param {Object} file - File object from express-fileupload
 * @returns {Promise<string>} - Relative path to uploaded file
 */
const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        // Validate file extension
        const ext = path.extname(file.name).toLowerCase();
        if (!ALLOWED_IMAGE_EXTS.includes(ext)) {
            return reject({
                message: `Invalid image format. Allowed: ${ALLOWED_IMAGE_EXTS.join(', ')}`
            });
        }

        // Validate file size
        if (file.size > MAX_IMAGE_SIZE) {
            return reject({
                message: `Image size exceeds ${MAX_IMAGE_SIZE / (1024 * 1024)}MB limit`
            });
        }

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        // Move file to upload directory
        file.mv(filepath, (err) => {
            if (err) {
                return reject({
                    message: 'Failed to upload image',
                    error: err.message
                });
            }

            // Return relative path for database storage
            const relativePath = `/uploads/projects/${filename}`;
            resolve(relativePath);
        });
    });
};

/**
 * Validate and upload video file
 * @param {Object} file - File object from express-fileupload
 * @returns {Promise<string>} - Relative path to uploaded file
 */
const uploadVideo = async (file) => {
    return new Promise((resolve, reject) => {
        // Validate file extension
        const ext = path.extname(file.name).toLowerCase();
        if (!ALLOWED_VIDEO_EXTS.includes(ext)) {
            return reject({
                message: `Invalid video format. Allowed: ${ALLOWED_VIDEO_EXTS.join(', ')}`
            });
        }

        // Validate file size
        if (file.size > MAX_VIDEO_SIZE) {
            return reject({
                message: `Video size exceeds ${MAX_VIDEO_SIZE / (1024 * 1024)}MB limit`
            });
        }

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        // Move file to upload directory
        file.mv(filepath, (err) => {
            if (err) {
                return reject({
                    message: 'Failed to upload video',
                    error: err.message
                });
            }

            // Return relative path for database storage
            const relativePath = `/uploads/projects/${filename}`;
            resolve(relativePath);
        });
    });
};

/**
 * Delete file from disk
 * @param {string} filePath - Relative path to file (e.g., /uploads/projects/file.jpg)
 */
const deleteFile = (filePath) => {
    if (!filePath) return;

    const absolutePath = path.join(__dirname, '../public', filePath);

    if (fs.existsSync(absolutePath)) {
        try {
            fs.unlinkSync(absolutePath);
        } catch (err) {
            console.error(`Failed to delete file ${filePath}:`, err);
        }
    }
};

module.exports = {
    uploadImage,
    uploadVideo,
    deleteFile
};
