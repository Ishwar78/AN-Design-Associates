import mongoose, { Schema, InferSchemaType, model } from "mongoose";

const DrawingSchema = new Schema(
  {
    title: { type: String, required: true },
    siteAddress: { type: String },
    previewImage: { type: String },
    pdfUrl: { type: String },
  },
  { timestamps: true },
);

export type DrawingDoc = InferSchemaType<typeof DrawingSchema> & { _id: any };

export default mongoose.models.Drawing || model("Drawing", DrawingSchema);
