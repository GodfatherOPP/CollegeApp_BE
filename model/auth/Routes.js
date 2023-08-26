const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AgentRouteSchema = mongoose.Schema({
  selectFrom: {
    type: String,
    required: true,
    trim: true,
  },
  selectEnd: {
    type: String,
    required: true,
    trim: true,
  },
  selectedColor: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
// AgentRouteSchema.plugin(mongoosePaginate);
// export model Role with RolesSchema
module.exports = mongoose.model("AgentRoutes", AgentRouteSchema);
