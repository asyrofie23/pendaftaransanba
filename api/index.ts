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
  const input = await c.req.json<any>()
  const query = `INSERT INTO form(id,name,phone,email,address,school,time) values ("${newId}","${input.name}","${input.phone}","${input.email}","${input.address}","${input.school}","${input.time}")`
  const newEvent = await c.env.DB.exec(query)
  // return c.json(newPendaftaransanba)
  console.log(input, 'input')
  console.log(newEvent, 'newPendaftaransanba')
  return c.json({ message: 'Pendaftaransanba created successfully', id: newId })
})
  export default app