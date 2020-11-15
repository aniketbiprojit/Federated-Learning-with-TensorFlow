// Code from https://stackoverflow.com/questions/25024179/reading-mnist-dataset-with-javascript-node-js
// Author https://stackoverflow.com/users/254532/lilleman
// Download files from http://yann.lecun.com/exdb/mnist/

const fs = require('fs')
const dataFileBuffer = fs.readFileSync(__dirname + '/train-images-idx3-ubyte')
const labelFileBuffer = fs.readFileSync(__dirname + '/train-labels-idx1-ubyte')

const load = () => {
	let pixelValues = []

	for (var image = 0; image < 8192; image++) {
		var pixels = []

		for (var x = 0; x <= 27; x++) {
			for (var y = 0; y <= 27; y++) {
				pixels.push(dataFileBuffer[image * 28 * 28 + (x + y * 28) + 15])
			}
		}

		var imageData = {}
		imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels

		pixelValues.push(imageData)
	}

	return pixelValues
}

module.exports = load
