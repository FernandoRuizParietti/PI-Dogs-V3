const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  const Dogs = sequelize.define('dogs', {
    id: {
      type: DataTypes.UUID,
      allowNull: false, //no permite dejar el campo en blanco
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // esta linea me genera automaticamente un UUID 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { //altura
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { //peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true, //permito que se pueda cargar una raza sin su foto
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: true, //permito que se pueda cargar una raza sin su foto
    },
  },{
    timestamps: false,
  
  });
};
