export const envSchema = {
  type: "object",
  required: ["MONGODB_URL"],
  properties: {
    MONGODB_URL: { type: "string" },
  },
};
