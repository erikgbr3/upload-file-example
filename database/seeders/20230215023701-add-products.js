'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {description: "Producto uno", movements: 'Bodega', tipe: 'Salida', amount: 23, are: 23, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto dos", movements: 'Tienda', tipe: 'Salida', amount: 16, are: 16, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto tres", movements: 'Tienda', tipe: 'Entrada', amount: 19, are: 19, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto cuatro", movements: 'Bodega', tipe: 'Entrada', amount: 26, are: 26, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto cinco", movements: 'Tienda', tipe: 'Salida', amount: 31, are: 31, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
