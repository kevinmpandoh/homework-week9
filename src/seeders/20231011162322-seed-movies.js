'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Movies', [{
      title: 'Naruto',
      genres: "Action",
      year: "2001",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'One Piece',
      genres: "Kartun",
      year: "1999",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
