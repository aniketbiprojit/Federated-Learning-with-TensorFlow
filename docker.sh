#! bin/sh
docker build -t hpc_1 -f tfjs.Dockerfile .
docker build -t hpc_2 .