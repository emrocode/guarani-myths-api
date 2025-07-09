"use strict";

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import fastifyHelmet from "@fastify/helmet";
import fastifyMongodb from "@fastify/mongodb";
import routes from "./routes/index.js";
import { envSchema } from "./schemas/env.js";

const app = Fastify({ logger: true });

await app.register(fastifyEnv, {
  dotenv: true,
  schema: envSchema,
});

app
  .register(fastifyMongodb, {
    forceClose: true,
    url: app.config.MONGODB_URL,
  })
  .ready(async () => {
    try {
      await app.mongo.client.db().command({ ping: 1 });
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("MongoDB connection failed!", err);
      process.exit(1);
    }
  });

app
  .register(fastifyCors, {
    origin: "*",
    methods: ["GET"],
  })
  .register(fastifyHelmet, { global: true })
  .register(routes);

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
