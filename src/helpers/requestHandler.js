import redis from "../redis.js";
import { TTL } from "../_constants/index.js";

export async function handleRequest(reply, cacheKey, fetchData) {
  try {
    const cached = await redis.get(cacheKey);

    if (cached) {
      return reply
        .header("X-Cache", "HIT")
        .header("Cache-Control", `public, s-maxage=${TTL}`)
        .send(cached);
    }

    const result = await fetchData();

    if (result === null) {
      return reply.code(404).send({
        statusCode: 404,
        code: "MYTH_NOT_FOUND",
        error: "Not Found",
        message: "The requested myth does not exist",
      });
    }

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
}
