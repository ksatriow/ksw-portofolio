'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Projects', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'description'
    });

    await queryInterface.addColumn('Projects', 'video_url', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'image_url'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Projects', 'image_url');
    await queryInterface.removeColumn('Projects', 'video_url');
  }
};
