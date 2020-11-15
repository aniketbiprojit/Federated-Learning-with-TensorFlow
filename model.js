const load_data = require('./data_loader')
const tf = require('@tensorflow/tfjs-node')
const fs = require('fs')

const load_model = async () => {
	const model = await tf.loadLayersModel(
		'file:///home/aniket/Work/federated/server/tfjs/model.json'
	)

	model.weights.forEach((w) => {
		console.log(w.name, w.shape)
	})

	model.compile({
		optimizer: 'sgd',
		loss: 'categoricalCrossentropy',
		metrics: ['accuracy'],
	})
	return model
}

let history = []

function onBatchEnd(batch, logs, model) {
	console.log('Accuracy', logs.acc)
	history.push(logs.acc)
	// process.exit()
	// console.log('Batch', batch)
}

const run = async (X_tensor, y_tensor, revision) => {
	const model = await load_model()

	return model
		.fit(X_tensor, y_tensor, {
			epochs: 10,
			batchSize: 32,
			callbacks: {
				onBatchEnd: (batch, logs, model) =>
					onBatchEnd(batch, logs, model),
			},
		})
		.then(async () => {
			if (!fs.existsSync('tfjs-models')) {
				fs.mkdirSync('tfjs-models')
			}
			await model.save(
				`file:///${__dirname}/tfjs-models/tfjs-${revision}`
			)
			console.log(history[0], history[history.length - 1])
			return history
		})
}

// run(X_tensor, y_tensor, Date.now())

module.exports = run
