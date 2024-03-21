'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.ProductCategory,
        {
          as: 'category',
          foreignKey: 'categoryId',
        }
      );
    }
  }
  Product.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La descripción es obligatoria'
        },
        /* isAlphanumeric: {
          msg: 'la description debe contener solo texto'
        } */    
      },
    },
    movements: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El movimiento es obligatorio'
        },
        isAlpha: {
          msg: 'El movimiento debe contener solo texto'
        },
      },
    },
    tipe: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El tipo es obligatorio'
        },
        isAlpha: {
          msg: 'La descipción debe contener solo texto'
        },
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El monto es obligatorio'
        },
        isNumeric: {
          msg: 'Debe escribir solo numeros'
        }
      },
    },
    are: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo es obligatorio'
        },
        isNumeric: {
          msg: 'Debe escribir solo numeros'
        }
      },
    },
    categoryId: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};