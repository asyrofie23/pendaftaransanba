import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/pendaftaransanbas", async (c) => {
  //Ini membuat route GET untuk endpoint /api/pendaftaransanbas. Artinya, ketika ada permintaan ke URL itu, fungsi di dalamnya akan dijalankan.

  let { results } = await c.env.DB.prepare("SELECT * FROM users").all();
  console.log(results);
  return c.json(results);
});
app.post("/api/pendaftaransanbas", async (c) => {
  // untuk menyimpan data pendaftaran baru ke dalam tabel users di database.
});
app.get("/api/pendaftaransanbas/:id", async (c) => {
  const userId = c.req.param("id"); //Mengambil nilai dari parameter :id di URL
  let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?") //Menjalankan perintah SQL untuk mengambil user berdasarkan ID.
    .bind(userId)
    .all();
  return c.json(results[0]); //Mengirimkan baris pertama dari hasil query sebagai response dalam bentuk JSON.
});

app.put("/api/pendaftaransanbas/:id", async (c) => {
  //endpoint HTTP PUT untuk mengubah data pendaftar berdasarkan id
  const userId = c.req.param("id");
  const input = await c.req.json<any>();
  const query = `UPDATE users SET name = "${input.name}", phone = "${input.phone}", email = "${input.email}", address = "${input.address}", school = "${input.school}", time = ${input.time} WHERE id = "${userId}"`;
  const user = await c.env.DB.exec(query);
  return c.json(user);
});

app.delete("/api/pendaftaransanbas/:id", async (c) => {
  //untuk menghapus data pengguna (user) dari tabel users berdasarkan id yang dikirim melalui URL.
  const userId = c.req.param("id");
  const query = `DELETE FROM users WHERE id = "${userId}"`;
  const user = await c.env.DB.exec(query);

  return c.json(user);
});
export default app;
