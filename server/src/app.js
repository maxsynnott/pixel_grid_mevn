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

// Create new db filled with random data, currently slow (500 x 500 reasonable limit)
app.post('/grids', (req, res) => {
	const db = req.db;

	const width = req.body.width;
	const height = req.body.height;
	const pixels = [];

	for (let i = 0; i < width * height; i++) {
		for (let j = 0; j < 3; j++) {
			pixels.push(Math.round(Math.random() * 255))
		}

		pixels.push(255)

		console.log(pixels.length)
	}

	const new_grid = new Grid({
		width: width,
		height: height,
		pixels: pixels
	})

	console.log('saving')
	new_grid.save(function (error) {
		console.log('Im here')
		if (error) {
			console.log('failure')
			res.send({
				success: false
			})
		} else {
			console.log('success')
			res.send({
				success: true
			})
		}
	})
	console.log('saving complete')
})

// Returns first grid data
app.get('/grid', (req, res) => {
	Grid.find({}, 'width height pixels', function (error, grids) {
		res.send({
			success:true,
			grid: grids[0]
		})
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