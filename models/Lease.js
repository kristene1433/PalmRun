import mongoose from "mongoose";

const LeaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    envelopeId: { type: String, required: true },
    signed: { type: Boolean, default: false },
    signedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Lease || mongoose.model("Lease", LeaseSchema);
