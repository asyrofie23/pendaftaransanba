import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/pendaftaransanbas", async (c) => {
  console.log(c.env.DB, "DB");
  try {
    const tableExists = await c.env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='form'"
    ).all();
    console.log(tableExists, "tableExists");
    const allTables = await c.env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table'"
    ).all();
    console.log(allTables, "allTables");

    if (!tableExists) {
      return c.json({ error: "Table 'form' does not exist" }, 404);
    }

    const res = await c.env.DB.prepare("SELECT * FROM form").all();
    console.log(res, "res");
    return c.json(res.results);
  } catch (error) {
    console.error("Error fetching pendaftaransanbas:", error);
    return c.json({ error: "Failed to fetch pendaftaransanbas" }, 500);
  }
});
app.post("/api/pendaftaransanbas", async (c) => {
  const newId = crypto.randomUUID();
  const input = await c.req.json<any>();
  console.log(JSON.stringify(input), "input");

  await c.env.DB.prepare(
    `
    INSERT INTO form (id, name, phone, email, address, school, time)
  `
  )
    .bind(
      3,
      "John Doe",
      "08123456789",
      "john@example.com",
      "123 Main St",
      "Example High School",
      "2025-06-16 10:00:00"
    )
    .run();

  // return c.json(newPendaftaransanba)
  console.log(input, "input");
  console.log("newPendaftaransanba");
  return c.json({
    message: "Pendaftaransanba created successfully",
    id: newId,
  });
});
export default app;
