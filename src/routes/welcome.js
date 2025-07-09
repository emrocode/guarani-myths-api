/**
 * Welcome endpoint.\
 * Show available resources.
 */
export default async function welcome(fastify) {
  fastify.get("/", async (_, reply) => {
    reply.code(200).send({
      resources: {
        myths: "/api/myths?lang={lang}",
        mythById: "/api/:id?lang={lang}",
        supportedLanguages: "/api/languages",
      },
    });
  });
}
