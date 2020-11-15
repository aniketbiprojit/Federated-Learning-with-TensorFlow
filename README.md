# This is in part to the medium [blog](https://medium.com/@aniketbiprojit/practical-federated-learning-76dd2034b1b0?o3a=true)

### Instructions

Set up the environment with requirements.txt(pip) or environment.yml(conda)

Use npm or yarn to install node dependencies.

Download dataset and extract:

http://yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz

http://yann.lecun.com/exdb/mnist/train-labels-idx1-ubyte.gz

Run in following order.
```
python create_model.py
./to_tfjs.sh
node train_on_cpus.js
node convert_tfjs_to_keras.js
python client_fed_average.py
```
