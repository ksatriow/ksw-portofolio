'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Check if admin user already exists
        const users = await queryInterface.sequelize.query(
            'SELECT id FROM "Users" WHERE username = \'admin\' LIMIT 1',
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        // Only create admin user if it doesn't exist
        if (users.length === 0) {
            const hashedPassword = bcrypt.hashSync('admin123', 10);
            await queryInterface.bulkInsert('Users', [
                {
                    username: 'admin',
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
    }
};
