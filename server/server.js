const dotenv = require('dotenv').config({ path: './config/.env' })
const { davinciConnector, mongoConnector } = require('./connectors')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
const tokens = 10

app.use(express.json())
app.use(cors())
app.listen(3001)

app.post('/api/davinci', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const answer = await davinciConnector.promptDavinci(prompt, tokens)
    await mongoConnector.addOne(prompt, answer)
    res.json({ answer: answer })
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

app.post('/api/auth', (req, res) => {
  const { user, pass } = req.body
  if (user === process.env.USER && pass === process.env.PASS) {
    res.json({ token: jwt.sign('admin', process.env.SECRET) })
  }
  else {
    res.status(401).end()
  }
})

app.post('/api/create', async (req, res) => {
  const { prompt, answer } = req.body;
  try {
    await mongoConnector.addOne(prompt, answer)
    const docs = await mongoConnector.fetchAll()
    res.json({ docs })
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

app.post('/api/read', async (req, res) => {
  try {
    const docs = await mongoConnector.fetchAll()
    res.json({ docs })
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

app.patch('/api/update', async (req, res) => {
  const { id, prompt, answer } = req.body
  try {
    await mongoConnector.updateOne(id, prompt, answer)
    const docs = await mongoConnector.fetchAll()
    res.json({ docs })
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

app.delete('/api/delete', async (req, res) => {
  const { id } = req?.body;
  try {
    await mongoConnector.deleteOne(id)
    const docs = await mongoConnector.fetchAll()
    res.json({ docs })
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})