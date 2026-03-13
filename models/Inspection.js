const mongoose = require('mongoose');

const checkItemSchema = new mongoose.Schema({
  name:    { type: String },
  status:  { type: String, default: 'na' },
  remarks: { type: String, default: '' },
}, { _id: false });

const inspectionSchema = new mongoose.Schema({
  createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerEmail: { type: String, default: '' },
  vehicleMake:       { type: String, required: true, trim: true },
  vehicleModel:      { type: String, default: '' },
  modelYear:         { type: String, default: '' },
  engineCapacity:    { type: String, default: '' },
  chassisNo:         { type: String, default: '' },
  registrationNo:    { type: String, default: '' },
  exteriorColor:     { type: String, default: '' },
  transmissionType:  { type: String, default: 'manual' },
  driveType:         { type: String, default: '2wd' },
  engineType:        { type: String, default: 'petrol' },
  customerName:      { type: String, default: '' },
  customerPhone:     { type: String, default: '' },
  inspectionDate:    { type: Date, default: Date.now },
  diagramZones:      { type: Map, of: String, default: {} },
  exteriorDetails:   [checkItemSchema],
  interiorComfort:   [checkItemSchema],
  electrical:        [checkItemSchema],
  mechanical:        [checkItemSchema],
  heatingCooling:    [checkItemSchema],
  tyresShocks:       [checkItemSchema],
  inspectorName:     { type: String, default: '' },
  inspectorSign:     { type: String, default: '' },
  inspectorStamp:    { type: String, default: '' },
  notes:             { type: String, default: '' },
  ratings: {
    exterior:       { type: Number, default: 5 },
    interior:       { type: Number, default: 5 },
    electrical:     { type: Number, default: 5 },
    mechanical:     { type: Number, default: 5 },
    heatingCooling: { type: Number, default: 5 },
    tyresShocks:    { type: Number, default: 5 },
    overall:        { type: Number, default: 5 },
  },
  status: { type: String, enum: ['draft','completed'], default: 'draft' },
  reportedIssue: {
    hasIssue:   { type: Boolean, default: false },
    message:    { type: String, default: '' },
    reportedAt: { type: Date },
    resolvedAt: { type: Date },
    adminReply: { type: String, default: '' },
    isResolved: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('Inspection', inspectionSchema);
