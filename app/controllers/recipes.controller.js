const db = require("../models");
const Recipes = db.recipes;
const Op = db.Sequelize.Op;

exports.health = (req, res) => {
  res.status(200).send({
    message: "Service is Up!"
  });
};

// Create and Save a new Receipt
exports.create = (req, res) => {
  // Validate request
  if (!req.body.recName) {
    res.status(400).send({
      message: "No recipe found!"
    });
    return;
  }

  // Create a Recipe
  const newRecipe = {
    recID: req.body.recID,
    recName: req.body.recName,
    recTime: req.body.recTime,
    recIngredients: req.body.recIngredients,
    recInstructions: req.body.recInstructions,
  };

  // Save Recipe in the database
  Recipes.create(newRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Occurred"
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  const recIngredients = req.query.recIngredients;
  var condition = recIngredients ? { recIngredients: { [Op.iLike]: `%${recIngredients}%` } } : null;
  //var condition = recIngredients.filter(item => item.arrayWithvalue.indexOf('') !== -1);

  Recipes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Occurred"
      });
    });
};


// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const recID = req.params.recID;

  Recipes.destroy({
    where: { recID: recID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${recID}. Maybe recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recipe with id=" + recID
      });
    });
};

