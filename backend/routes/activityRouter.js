const { Router } = require("express");

const activitiesListRouter = Router();

const activityController = require("../controllers/activityController");

const {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} = activityController;

activitiesListRouter.route("/")
  .get(getAllActivities)
  .post(createActivity);

activitiesListRouter.route("/:id")
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = activitiesListRouter;
