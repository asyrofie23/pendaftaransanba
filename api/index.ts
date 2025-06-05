import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/pendaftaransanbas', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM pendaftaransanbas").all()
  return c.json(results)
})
app.post('/api/pendaftaransanbas', async (c) => {
  const newId = crypto.randomUUID()
  // const input = await c.req.json<any>()
  // const query = `INSERT INTO pendaftransanbas(id,name,phone,email,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  // const newEvent = await c.env.DB.exec(query)
  // return c.json(newPendaftaransanba)
  console.log(c)
  return c.json({ message: 'Pendaftaransanba created successfully', id: newId })
})
  export default app