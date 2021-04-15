#! bin/bash
python create_model.py
./to_tfjs.sh
node train_on_cpus.js
node convert_tfjs_to_keras.js
python client_fed_average.py
