const { Router } = require("express");

const clientRouter = Router();

const clientController = require("../controllers/clientController");

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = clientController;

clientRouter.route("/")
  .get(getClients)
  .post(createClient);

clientRouter.route("/:id")
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);
module.exports = clientRouter;
