const Client = require("../models/client");
const serverError = require("../utils/serverError");

const clientNotFound = (res) => res.status(404).json({ message: "Client not found" });

const getClients = async ({ query }, res) => {
  try {
    const clients = await Client.find({ query });
    res.status(200).json({ clients });
  } catch (error) {
    serverError(res);
  }
};

const getClientById = async ({ params: { id } }, res) => {
  try {
    const client = await Client.findById(id);
    if (!client) {
      clientNotFound(res);
    } else {
      res.status(200).json(client);
    }
  } catch (error) {
    serverError(res);
  }
};

const updateClient = async ({ params: { id }, body }, res) => {
  try {
    const client = await Client.findByIdAndUpdate(id, body, { new: true });
    if (!client) {
      clientNotFound(res);
    } else {
      res.status(200).json({ message: `client ${id} updated` });
    }
  } catch (error) {
    serverError(res);
  }
};

const deleteClient = async ({ params: { id } }, res) => {
  try {
    const client = await Client.findByIdAndDelete(id, { new: true });
    if (!client) {
      clientNotFound(res);
    } else {
      res.status(200).json({ message: `client ${id} deleted` });
    }
  } catch (error) {
    serverError(res);
  }
};
module.exports = {
  getClients,
  getClientById,
  updateClient,
  deleteClient
};
