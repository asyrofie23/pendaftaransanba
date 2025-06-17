import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/pendaftaransanbas", async (c) => {
  try {
    const res = await c.env.DB.prepare("SELECT * FROM users").all();
    return c.json(res.results);
  } catch (error) {
    console.error("Error fetching pendaftaransanbas:", error);
    return c.json({ error: "Failed to fetch pendaftaransanbas" }, 500);
  }
});
app.post("/api/pendaftaransanbas", async (c) => {
  const newId = crypto.randomUUID();
  const input = await c.req.json<any>();
  await c.env.DB.prepare(
    `
    INSERT INTO users (id, name, phone, email, address, school, time)
VALUES ("${newId}", "${input.name}", "${input.phone}", "${input.email}", "${input.address}", "${input.school}", "${input.time}");
  `
  ).run();

  return c.json({
    message: "Pendaftaransanba created successfully",
    id: newId,
  });
});
export default app;
