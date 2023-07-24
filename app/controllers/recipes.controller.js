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

/*Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const recID = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};*/

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

/* Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/
