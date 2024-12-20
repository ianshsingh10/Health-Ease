import mongoose from "mongoose";

const ambulanceRequestSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: false, // Optional if the user enters a manual location
  },
  longitude: {
    type: Number,
    required: false,
  },
  manualLocation: {
    type: String,
    required: false, // Only required if latitude and longitude are not provided
  },
  requestedAt: {
    type: Date,
    default: Date.now, // Automatically records the time of the request
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model if you track user accounts
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "dispatched", "completed", "canceled"],
    default: "pending", // Default status when a request is created
  },
});

const AmbulanceRequest = mongoose.model("AmbulanceRequest", ambulanceRequestSchema);

export default AmbulanceRequest;
