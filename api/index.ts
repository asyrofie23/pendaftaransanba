interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/pendaftaransanbas")) {
        if (request.method == 'GET') {
        let { results } = await env.DB.prepare("SELECT * FROM pendaftaransanbas").all();
        return Response.json(results);
      } else if (request.method == 'POST') {
        const newId = crypto.randomUUID()
        const input = await request.json<any>()
        const query = `INSERT INTO pendaftaransanbas(id,name,phone,email,address,school,time) values ("${newId}","${input.name}","${input.phone}","${input.email}","${input.address}","${input.school}","${input.time}")`;
        const newPendaftaransanba = await env.DB.exec(query);
        return Response.json(newPendaftaransanba);
      }
    }
    return env.ASSETS.fetch(request);
 },
} satisfies ExportedHandler<Env>;