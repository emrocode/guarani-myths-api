import redis from "../redis.js";

/**
 * Health check endpoint.\
 * Verifies database and caching availability.
 */
export default async function health(fastify) {
  fastify.get("/", async (_, reply) => {
    const now = new Date().toISOString();
    const uptime = Number(process.uptime().toFixed(2));

    const check = async (name, fn) => {
      try {
        await fn();
        return { [name]: { status: "connected" } };
      } catch {
        return { [name]: { status: "disconnected" } };
      }
    };

    const [db, cache] = await Promise.all([
      check("database", () => fastify.mongo.db.admin().ping()),
      check("cache", () => redis.ping()),
    ]);

    // Merge the results from db and cache checks into one object
    const components = { ...db, ...cache };
    // Check that every component has status "connected"
    const isHealthy = Object.values(components).every(
      (c) => c.status === "connected",
    );

    reply.code(isHealthy ? 200 : 503).send({
      status: isHealthy ? "ok" : "fail",
      timestamp: now,
      uptimeSeconds: uptime,
      components,
    });
  });
}
