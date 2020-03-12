const express = require('express')

const app = express()

app.get('/test', (req, res) => {
  res.send({
      message: "Hello World!"	
  })
})

app.get('/random/:width/:height', (req, res) => {
	pixelData = []

	// Generate a random [r, g, b, 255] for each pixel
	for (let i = 0; i < req.params.width * req.params.height; i++) {
		for (let j = 0; j < 3; j++) {
			pixelData.push(Math.round(Math.random() * 255))
		}

		pixelData.push(255)
	}

	res.send({
		data: pixelData
	})
})

app.listen(process.env.PORT || 8081)