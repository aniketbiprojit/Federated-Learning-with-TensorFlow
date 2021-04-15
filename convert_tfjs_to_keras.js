const { exec } = require('child_process')
const fs = require('fs')

model_dirs = fs.readdirSync(`${__dirname}/tfjs-models`)

if (!fs.existsSync('keras_models')) fs.mkdirSync('keras_models')

model_dirs.forEach((dir) => {
	const cmd = `tensorflowjs_converter --input_format tfjs_layers_model tfjs-models/${dir}/model.json keras_models/${dir}.h5 --output_format keras_saved_model`
	console.log(cmd)
	exec(cmd)
})
