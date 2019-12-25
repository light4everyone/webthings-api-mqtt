import * as mongoose from 'mongoose';

export const ThingSchema = new mongoose.Schema({
  types: [String],
  title: String,
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: String,
  values: [{
    name: String,
    value: Object
  }],
  properties: [{
    title: String,
    description: String,
    contextType: String,
    type: { type: String },
    name: String
  }]
});
