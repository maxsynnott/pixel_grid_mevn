const express = require('express')

const app = express()

app.get('/test', (req, res) => {
  res.send({
      message: "Hello World!"	
  })
})

app.listen(process.env.PORT || 8081)