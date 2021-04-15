import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 

import tensorflow as tf
import tensorflow.keras as keras
# import tensorflow_federated as tff

from tensorflow_federated.python.tensorflow_libs import tensor_utils
from tensorflow_federated.python.learning.framework import optimizer_utils

import collections
#
model = keras.models.load_model('./model.h5')
# model.compile('SGD')

weights = [[],[]]
weights_delta_arr = []

client_models = [keras.models.load_model(f'./keras_models/{model}') for model in os.listdir('keras_models')]
for client_model in client_models:
    # client_model.compile('SGD')
    weights[0].append(client_model.weights[0])
    weights[1].append(client_model.weights[1])
    # print(tf.reduce_mean(client_model.weights[0]))
    weights_delta = tf.nest.map_structure(tf.subtract,client_model.weights,model.weights)
    weights_delta_arr.append(weights_delta)

updated_weights = [tf.reduce_mean(weights[0],0),tf.reduce_mean(weights[1],0)]
updated_weights_with_server = [tf.reduce_mean([updated_weights[0],model.weights[0]],0),tf.reduce_mean([updated_weights[1],model.weights[1]],0)]

print('Weights Averaged. Saving model.')
print(model.summary(),len(model.weights), model.weights[1].shape)
print(len(weights[0]),updated_weights[0].shape)
model.layers[0].set_weights(updated_weights_with_server)

model.save('./model.h5')
