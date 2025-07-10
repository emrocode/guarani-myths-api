import redis from "../redis.js";
import { TTL } from "../_constants/index.js";
import { mythCollectionSchema, mythByIdSchema } from "../schemas/myths.js";

/**
 * Myths endpoint.\
 * Returns the collection of myths.
 */
export default async function myths(fastify) {
  fastify.get("/", { schema: mythCollectionSchema }, async (req, reply) => {
    const lang = req.query.lang;
    const cacheKey = `myths:${lang}`;

    try {
      const cached = await redis.get(cacheKey);

      if (cached) {
        return reply
          .header("X-Cache", "HIT")
          .header("Cache-Control", `public, s-maxage=${TTL}`)
          .send(cached);
      }

      const collection = fastify.mongo.db.collection("myths");
      const data = await collection
        .find({ _id: { $ne: "__meta__" } }, { projection: { _id: 0 } })
        .sort({ id: 1 })
        .toArray();

      const result = data.map((myth) => ({
        id: myth.id,
        image: myth.image,
        title: myth.translations?.[lang].title,
        description: myth.translations?.[lang].description,
      }));

      await redis.setex(cacheKey, TTL, result);

      reply
        .code(200)
        .header("X-Cache", "MISS")
        .header("Cache-Control", `public, s-maxage=${TTL}`)
        .send(result);
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        statusCode: 500,
        code: "MYTHS_FETCH_ERROR",
        error: "Internal Server Error",
        message: "Error fetching myths",
      });
    }
  });

  fastify.get("/:id", { schema: mythByIdSchema }, async (req, reply) => {
    const id = +req.params.id; // Type number
    const lang = req.query.lang;
    const cacheKey = `myths:${id}:${lang}`;

    try {
      const cached = await redis.get(cacheKey);

      if (cached) {
        return reply
          .header("X-Cache", "HIT")
          .header("Cache-Control", `public, s-maxage=${TTL}`)
          .send(cached);
      }

      const collection = fastify.mongo.db.collection("myths");
      const myth = await collection.findOne({ id }, { projection: { _id: 0 } });

      if (!myth) {
        return reply.code(404).send({
          statusCode: 404,
          code: "MYTH_NOT_FOUND",
          error: "Not Found",
          message: "The requested myth does not exist",
        });
      }

      const result = {
        id: myth.id,
        image: myth.image,
        title: myth.translations?.[lang]?.title,
        description: myth.translations?.[lang]?.description,
      };

      await redis.setex(cacheKey, TTL, result);

      reply
        .code(200)
        .header("X-Cache", "MISS")
        .header("Cache-Control", `public, s-maxage=${TTL}`)
        .send(result);
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        statusCode: 500,
        code: "MYTHS_FETCH_ERROR",
        error: "Internal Server Error",
        message: "Error fetching myths",
      });
    }
  });
}
