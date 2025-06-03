interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/pendaftaransanbas")) {
        if (request.method == 'GET') {
        let { results } = await env.DB.prepare("SELECT * FROM events").all();
        return Response.json(results);
      } else if (request.method == 'POST') {
        const newId = crypto.randomUUID()
        const input = await request.json<any>()
        const query = `INSERT INTO events(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`;
        const newEvent = await env.DB.exec(query);
        return Response.json(newEvent);
      }
    }
    return env.ASSETS.fetch(request);
 },
} satisfies ExportedHandler<Env>;