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
app.get("/api/pendaftaransanbas/:id", async (c) => {
  const pendaftaransanbaId = c.req.param("id");
  let { results } = await c.env.DB.prepare(
    "SELECT * FROM pendaftaransanbas WHERE id = ?"
  )
    .bind(pendaftaransanbaId)
    .all();
  return c.json(results[0]);
});

app.put("/api/pendaftaransanbas/:id", async (c) => {
  const pendaftaransanbaId = c.req.param("id");

  const input = await c.req.json<any>();
  const query = `UPDATE pendaftaransanbas SET name = "${input.name}", phone = "${input.phone}", email = "${input.email}", address = "${input.address}", school = "${input.school}", time = ${input.time} WHERE id = "${pendaftaransanbaId}"`;
  const pendaftaransanba = await c.env.DB.exec(query);

  return c.json(pendaftaransanba);
});

app.delete("/api/pendaftaransanbas/:id", async (c) => {
  const pendaftaransanbaId = c.req.param("id");

  const query = `DELETE FROM pendaftaransanbas WHERE id = "${pendaftaransanbaId}"`;
  const pendaftaransanba = await c.env.DB.exec(query);

  return c.json(pendaftaransanba);
});
export default app;
