import { mythCollectionSchema, mythByIdSchema } from "../schemas/myths.js";
import { handleRequest } from "../helpers/requestHandler.js";

/**
 * Myths endpoint.\
 * Returns the collection of myths.
 */
export default async function myths(fastify) {
  const collection = fastify.mongo.db.collection("myths");

  fastify.get("/", { schema: mythCollectionSchema }, async (req, reply) => {
    const lang = req.query.lang;
    const cacheKey = `myths:${lang}`;

    const fetchData = async () => {
      const data = await collection
        .find({ _id: { $ne: "__meta__" } }, { projection: { _id: 0 } })
        .sort({ id: 1 })
        .toArray();

      return data.map((myth) => ({
        id: myth.id,
        image: myth.image,
        title: myth.translations?.[lang].title,
        description: myth.translations?.[lang].description,
      }));
    };

    await handleRequest(reply, cacheKey, fetchData);
  });

  fastify.get("/:id", { schema: mythByIdSchema }, async (req, reply) => {
    const id = +req.params.id;
    const lang = req.query.lang;
    const cacheKey = `myths:${id}:${lang}`;

    const fetchData = async () => {
      const myth = await collection.findOne({ id }, { projection: { _id: 0 } });

      if (!myth) return null;

      return {
        id: myth.id,
        image: myth.image,
        title: myth.translations?.[lang]?.title,
        description: myth.translations?.[lang]?.description,
      };
    };

    await handleRequest(reply, cacheKey, fetchData);
  });
}
