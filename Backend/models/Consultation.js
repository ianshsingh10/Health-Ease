import mongoose from "mongoose";
const consultationSchema = new mongoose.Schema({
    username:String,
    name: String,
    email: String,
    location: String,
    doctorName: String,
    date: String,
    time: String,
    symptoms: String,
  });

const Consult = mongoose.model('Consult', consultationSchema);

export default Consult;