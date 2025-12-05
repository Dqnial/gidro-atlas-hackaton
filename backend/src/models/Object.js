import mongoose from "mongoose";

const objectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    region: String,
    resource_type: {
      type: String,
      enum: ["lake", "canal", "reservoir"],
      required: true,
    },
    water_type: { type: String, enum: ["fresh", "non-fresh"], required: true },
    fauna: Boolean,
    passport_date: Date,
    technical_condition: { type: Number, min: 1, max: 5 },
    latitude: Number,
    longitude: Number,
    pdf_url: String,
  },
  { timestamps: true }
);

export default mongoose.model("Object", objectSchema);
