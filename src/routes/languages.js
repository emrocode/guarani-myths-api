import { supportedLanguages } from "../_constants/index.js";

/**
 * Languages endpoint.\
 * Returns supported languages.
 */
export default async function languages(fastify) {
  fastify.get("/", async (_, reply) => {
    reply.code(200).send({ supportedLanguages });
  });
}
