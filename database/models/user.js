'use strict';
import bcrypt from 'bcrypt';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate:{
        notNull: {
          msg: 'El nombre es obligatorio',
        },
        isAlpha: {
          msg: 'El nombre debe contener sólo texto',
        },
      },
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      validate:{
        notNull: {
          msg: 'El nombre de usuario es obligatorio',
        },
      },
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate:{
        notNull: {
          msg: 'El email es obligatorio',
        },
        isEmail: {
          msg: 'Debe ingresar un Email válido',
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      
    },
    role: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING(128),
    passwordResetExpire: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};