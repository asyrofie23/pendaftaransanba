import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/pendaftaransanbas", async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM users").all();
  console.log(results);
  return c.json(results);
});
app.post("/api/pendaftaransanbas", async (c) => {
  try {
    const newId = crypto.randomUUID();
    const input = await c.req.json<any>();
    const query = `INSERT INTO users (id,name,phone,email,address,school,time) values ("${newId}","${input.name}","${input.phone}","${input.email}","${input.address}","${input.school}",${input.time})`;
    const newUser = await c.env.DB.exec(query);
    return c.json(newUser);
  } catch (error) {
    console.error("Error in POST /api/pendaftaransanbas:", error);
  }
});
//query adalah suatu command yang bisa digunakan di database
app.get("/api/pendaftaransanbas/:id", async (c) => {
  const userId = c.req.param("id");
  let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?")
    .bind(userId)
    .all();
  return c.json(results[0]);
});

app.put("/api/pendaftaransanbas/:id", async (c) => {
  const userId = c.req.param("id");

  const input = await c.req.json<any>();
  const query = `UPDATE users SET name = "${input.name}", phone = "${input.phone}", email = "${input.email}", address = "${input.address}", school = "${input.school}", time = ${input.time} WHERE id = "${userId}"`;
  const user = await c.env.DB.exec(query);

  return c.json(user);
});

app.delete("/api/pendaftaransanbas/:id", async (c) => {
  const userId = c.req.param("id");

  const query = `DELETE FROM users WHERE id = "${userId}"`;
  const user = await c.env.DB.exec(query);

  return c.json(user);
});
export default app;
