/**
 * Meta endpoint.\
 * Indicates the source of the information.
 */
export default async function meta(fastify) {
  fastify.get("/", async (req, reply) => {
    try {
      const collection = fastify.mongo.db.collection("myths");
      // find special id __meta__ to return as data
      const meta = await collection.findOne(
        { _id: "__meta__" },
        { projection: { _id: 0 } },
      );

      if (!meta) {
        return reply.code(404).send({ error: "Metadata not found" });
      }

      reply.code(200).send(meta);
    } catch (error) {
      req.log.error(err);
      reply
        .code(500)
        .send({ error: "Internal error while retrieving metadata" });
    }
  });
}
