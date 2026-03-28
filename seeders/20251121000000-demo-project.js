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
                }
            ], {});
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Projects', null, {});
    }
};
