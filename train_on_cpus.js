//
const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length

const load_data = require('./data_loader')
const tf = require('@tensorflow/tfjs-node')
const { writeFileSync, createWriteStream } = require('fs')

const data = load_data()

const X = data.map((elem) => {
	const key = Object.keys(elem)[0]
	return elem[key].map((val) => val / 255)
})

const arr = Array.apply(null, Array(10)).map(() => 0)
const y = data.map((elem) => {
	const key = parseInt(Object.keys(elem)[0])
	const copy_arr = Object.assign([], arr)
	for (let index = 0; index < copy_arr.length; index++) {
		if (index === key) {
			copy_arr[index] = 1
		}
	}
	return copy_arr
})

if (cluster.isMaster) {
	console.log(X[0])
	console.log(y[0], y[1])

	console.log('X:', X.length)
	console.log('y:', y.length)

	console.log(`Master ${process.pid} is running`)

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}
} else {
	const batch_size = 1024
	let index = cluster.worker.id
	const start = (index - 1) * batch_size
	const end = index * batch_size

	const X_tensor = tf.tensor2d(X.slice(start, end), [batch_size, 784])
	const y_tensor = tf.tensor2d(y.slice(start, end), [batch_size, 10])
	console.log(`Worker ${process.pid} started:`)

	const run = require('./model')
	run(X_tensor, y_tensor, index).then((history) => {
		process.exit()
	})
}
