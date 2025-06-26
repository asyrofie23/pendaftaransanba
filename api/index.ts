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
  //Fungsinya adalah untuk menyimpan data pendaftaran baru ke dalam tabel users di database.
  try {
    const newId = crypto.randomUUID(); //Menghasilkan ID unik baru untuk pengguna baru
    const input = await c.req.json<any>(); //Mengambil data JSON
    const query = `INSERT INTO users (id,name,phone,email,address,school,time) values ("${newId}","${input.name}","${input.phone}","${input.email}","${input.address}","${input.school}",${input.time})`;
    //Membuat query SQL INSERT INTO untuk memasukkan data user baru ke tabel users.

    const newUser = await c.env.DB.exec(query); //Mengeksekusi query SQL ke database
    return c.json(newUser);
  } catch (error) {
    console.error("Error in POST /api/pendaftaransanbas:", error);
  }
});
app.get("/api/pendaftaransanbas/:id", async (c) => {
  const userId = c.req.param("id"); //Mengambil nilai dari parameter :id di URL
  let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?") //Menjalankan perintah SQL untuk mengambil user berdasarkan ID.
    .bind(userId)
    .all();
  return c.json(results[0]); //Mengirimkan baris pertama dari hasil query sebagai response dalam bentuk JSON.
});

app.put("/api/pendaftaransanbas/:id", async (c) => {
  //mengubah data pendaftar berdasarkan id
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
