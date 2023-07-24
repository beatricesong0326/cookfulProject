module.exports = (sequelize, Sequelize) => {
  const Recipes = sequelize.define("recipes", {
    recID: {
      type: Sequelize.STRING
    },
    recName: {
      type: Sequelize.STRING
    },
    recTime: {
      type: Sequelize.STRING
    },
    recIngredients: {
      type: Sequelize.TEXT     /*ARRAY(Sequelize.TEXT)*/
    },
    recInstructions: {
      type: Sequelize.TEXT
    }
  });

  
  return Recipes;
};
