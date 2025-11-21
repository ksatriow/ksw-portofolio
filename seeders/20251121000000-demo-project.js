'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const projects = await queryInterface.sequelize.query(
            'SELECT id FROM "Projects" LIMIT 1',
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        if (projects.length === 0) {
            await queryInterface.bulkInsert('Projects', [
                {
                    title: 'BTrack',
                    description: 'Bus Tracker Application',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'GitFinder',
                    description: 'Finding git user information',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Smart Home',
                    description: 'IoT based home automation',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'E-Commerce',
                    description: 'Online shopping platform',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Projects', null, {});
    }
};
