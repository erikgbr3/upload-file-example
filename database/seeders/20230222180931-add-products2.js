'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {description: "Producto 6", movements: 'Bodega', tipe: 'Salida', amount: 46, are: 46, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 7", movements: 'Bodega', tipe: 'Salida', amount: 41, are: 28, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 8", movements: 'Tienda', tipe: 'Salida', amount: 28, are: 28, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 9", movements: 'Tienda', tipe: 'Entrada', amount: 32, are: 32, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 10", movements: 'Bodega', tipe: 'Entrada', amount: 37, are: 37, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 11", movements: 'Tienda', tipe: 'Salida', amount: 39, are: 39, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 12", movements: 'Bodega', tipe: 'Salida', amount: 44, are: 44, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 13", movements: 'Tienda', tipe: 'Salida', amount: 26, are: 26, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 14", movements: 'Tienda', tipe: 'Entrada', amount: 47, are: 47, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 15", movements: 'Bodega', tipe: 'Entrada', amount: 35, are: 35, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 16", movements: 'Tienda', tipe: 'Salida', amount: 50, are: 50, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 17", movements: 'Bodega', tipe: 'Salida', amount: 41, are: 28, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 18", movements: 'Tienda', tipe: 'Salida', amount: 53, are: 53, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 19", movements: 'Bodega', tipe: 'Salida', amount: 49, are: 29, createdAt: new Date(), updatedAt: new Date()},
      {description: "Producto 20", movements: 'Tienda', tipe: 'Salida', amount: 29, are: 29, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
