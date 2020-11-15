import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 

import tensorflow as tf

import tensorflow.keras as keras

model = keras.models.Sequential([
    keras.layers.Dense(10, tf.nn.softmax, input_shape=(784,),kernel_initializer='zeros')
])

model.compile('Adam','categorical_crossentropy')

model.summary()

model.save('model.h5')
