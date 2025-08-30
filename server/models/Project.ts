import mongoose, { Schema, InferSchemaType, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    pdfUrl: { type: String },
  },
  { timestamps: true },
);

export type ProjectDoc = InferSchemaType<typeof ProjectSchema> & { _id: any };

export default mongoose.models.Project || model("Project", ProjectSchema);
