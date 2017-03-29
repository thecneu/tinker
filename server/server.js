const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const axios = require('axios')
const low = require('lowdb')
const db = low('db.json')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.defaults({
  exercises: [],
  entries: []
}).write()


const setAll = (state) => db.setState(state)
const getAll = () => db.getState()
const getById = (type, id) => db.get(type).find({id}).value()
const getByType = (type) => db.get(type).value()
const create = (type, state) => db.get(type).push(state)
const updateById = (type, id, state) => db.get(type).find({id}).assign(state).write()
const deleteById = (type, id) => db.get(type).remove({id}).write()

const imageQueue = {
  started: false,
  images: [],

  download() {
    if (this.images.length === 0) {
      this.started = false
      return false
    }

    let image = this.images.shift()
    let imagePath = `public/assets/${image.split('/').pop()}`
    this.started = true
    fs.open(imagePath, 'r', (err, fd) => {
      if (err) {
        if (err.code === 'ENOENT') {
          axios.get(image, {'content-type': 'stream'}).then(res => res.data).then(img => {
            img.pipe(fs.createWriteStream(img))
            this.download()
          })
        }
      }
    })
  },

  add(url) {
    this.images.push(url)

    if (!this.started) {
      this.download()
    }
  }
}

app.get('/', (req, res) => {
  res.send(db.getState())
})

app.post('/', (req, res) => {
  db.setState(req.body)
  res.send(db.getState())
})

app.get('/exercises', (req, res) => {
  res.send(db.get('exercises').value())
})

app.get('/exercises/:id', (req, res) => {
  res.send(db.get('exercises').find({id: req.params.id}).value())
})

app.post('/exercises', (req, res) => {
  res.send(req.body)
})

app.put('/exercises/:id', (req, res) => {
  res.send(req.body)
})

app.delete('/exercises/:id', (req, res) => {
  res.send(req.body)
})

app.get('/entries', (req, res) => {
  res.send(db.get('entries').value())
})

app.post('/entries', (req, res) => {
  res.send(req.body)
})

app.put('/entries/:id', (req, res) => {
  res.send(req.body)
})

app.delete('/entries/:id', (req, res) => {
  res.send(req.body)
})

app.get('/download/:image', (req, res) => {
  const image = decodeURIComponent(req.params.image)
  imageQueue.add(image)
})

app.listen(9000, () => console.log('server is listening'))
