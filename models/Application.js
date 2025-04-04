// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  street1: String,
  street2: String,
  city: String,
  stateValue: String,
  zip: String,
  phone: String,
  additionalRenters: [
    {
      firstName: String,
      lastName: String,
      isAdult: Boolean,
      isChild: Boolean,
      street1: String,
      street2: String,
      city: String,
      stateValue: String,
      zip: String,
    },
  ],
  startDate: Date,
  endDate: Date,
  status: { type: String, default: 'pending' },
  ownerComment: { type: String, default: '' },
  payment: {
    amount: Number,
    status: String,
    date: Date,
    sessionId: String,
  },
  createdAt: { type: Date, default: Date.now },
});
