'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductCategories', [
      {name: "Categoria uno", description: 'prueba', createdAt: new Date(), updatedAt: new Date()},
      {name: "Categoria dos", description: 'prueba', createdAt: new Date(), updatedAt: new Date()},
      {name: "Categoria tres", description: 'prueba', createdAt: new Date(), updatedAt: new Date()},
      {name: "Categoria cuatro", description: 'prueba', createdAt: new Date(), updatedAt: new Date()},
      {name: "categoria cinco", description: 'prueba', createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('ProductCategories', null, {});
     
  }
};
