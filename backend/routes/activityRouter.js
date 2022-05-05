const { Router } = require("express");

const activityRouter = Router();

const activityController = require("../controllers/activityController");

const {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} = activityController;

activityRouter.route("/")
  .get(getAllActivities)
  .post(createActivity);

activityRouter.route("/:id")
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = activityRouter;
