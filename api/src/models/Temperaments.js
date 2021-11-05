const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Temperament = sequelize.define('temperaments', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    // temperamentId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4, // esta linea me genera automaticamente un UUID
    //   },
  },{
    timestamps: false
  
  });
};
