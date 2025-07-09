import { supportedLanguages } from "../_constants/index.js";

const mythObjectSchema = {
  type: "object",
  required: ["id", "image", "title", "description"],
  properties: {
    id: { type: "number" },
    image: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
  },
};

export const mythCollectionSchema = {
  querystring: {
    type: "object",
    required: ["lang"],
    properties: {
      lang: { type: "string", enum: supportedLanguages },
    },
  },
  response: {
    200: {
      type: "array",
      items: mythObjectSchema,
    },
  },
};

export const mythByIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
    },
  },
  querystring: {
    type: "object",
    required: ["lang"],
    properties: {
      lang: { type: "string", enum: supportedLanguages },
    },
  },
  response: {
    200: mythObjectSchema,
  },
};
