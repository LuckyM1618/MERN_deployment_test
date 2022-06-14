// Import controller
const NinjaController = require("../controllers/ninja.controller");

// Export routes
module.exports = app => {
    // Get all Ninjas route
    app.get("/api/ninjas", NinjaController.findAllNinjas);

    // Create Ninja route
    app.post("/api/ninjas/new", NinjaController.createNinja);

    // Get one Ninja route
    app.get("/api/ninjas/:id", NinjaController.findOneNinja);

    // Update Ninja route
    app.put("/api/ninjas/:id/update", NinjaController.updateNinja);

    // Delete Ninja route
    app.delete("/api/ninjas/:id/delete", NinjaController.deleteNinja);
}