const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    aadharNo: { type: String, required: true },
    gender: { type: String, required: true },
    DOB: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    fathersName: { type: String, required: true },
    fathersAadharNo: { type: String, required: true },
    mothersName: { type: String, required: true },
    mothersAadharNo: { type: String, required: true },
    permanentNo: { type: String, required: true },
    birthAddress: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    state: { type: String, required: true },
    hospital: { type: String, required: true }
});

module.exports = mongoose.model('Application', applicationSchema);