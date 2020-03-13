// Mongoose setup
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grids');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback) {
	console.log("Connection Succeeded");
});
//

// Model requires
	const Grid = require('../models/grid')
// 

// Express setup
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
//

app.post('/grids', (req, res) => {
	const db = req.db;

	console.log('below')
	console.log(req)
	console.log(req.body)

	const width = req.body.width;
	const height = req.body.height;
	const pixels = [];

	for (let i = 0; i < width * height; i++) {
		for (let j = 0; j < 3; j++) {
			pixels.push(Math.round(Math.random() * 255))
		}

		pixels.push(255)
	}

	const new_grid = new Grid({
		width: width,
		height: height,
		pixels: pixels
	})

	new_grid.save(function (error) {
		if (error) {
			res.send({
				success: false
			})
		} else {
			res.send({
				success: true
			})
		}
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
		pixels: pixelData
	})
})

app.listen(process.env.PORT || 8081)