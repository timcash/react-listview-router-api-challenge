const express = require('express')
const morgan = require('morgan')

// for the sake of this exercise, we'll just load the "database"
// on server start-up from static json files
const items = require('../data/items.json')
const comments = require('../data/comments.json')

function server() {
  const app = express()
  const port = process.env.PORT || 5000

  app.use(morgan('dev'))

  app.get('/api/items', (req, res) => {
    res.send(items.filter(item => item.userId === req.query.userId))
  })

  app.get('/api/comments', (req, res) => {
    // console.log(req.query)
    // console.log(comments[req.query.itemId])
    itemComments = comments[req.query.itemId]
    if (itemComments === undefined) { 
      res.send([{
        "id": "7111230d-166a-451f-a21b-6c5e76935c68",
        "text": "Server Generated Comment",
        "userId":"c98f52d2-d521-4ecc-bba1-d63ce7591bfb",
        "itemId":"af64c024-ead0-4afb-bc32-d41ee606fb07"
      }])
    } else {
      res.send(itemComments)
    }
  })

  app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))

  return app
}

if (require.main === module) server().start()

module.exports = server
