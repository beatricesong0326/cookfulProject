module.exports = app => {
  const recipes = require("../controllers/recipes.controller.js");

  var router = require("express").Router();

  // Create a new recipe
  router.post("/", recipes.create);

  // Retrieve all recipe
  router.get("/", recipes.findAll);

  // Retrieve all published recipe
  //router.get("/published", recipes.findAllPublished);

  // Retrieve a single recipe with id
  //router.get("/:id", recipess.findOne);

  // Update a recipe with id
  //router.put("/:id", recipes.update);

  // Delete a recipe with id
  router.delete("/:id", recipes.delete);

  // Delete all recipe
  //router.delete("/", recipess.deleteAll);


  //health check endpoint
  router.get("/health", recipes.health);

  app.use("/api/recipes", router);
};
