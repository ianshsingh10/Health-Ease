import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  date: {
    type: String, // Store date as a string in 'YYYY-MM-DD' format
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
