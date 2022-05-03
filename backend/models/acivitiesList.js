const { model, Schema } = require("mongoose");

const activitiesListSchema = Schema(
  {
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }]

  }

);

module.exports = model("ActivitiesList", activitiesListSchema);
