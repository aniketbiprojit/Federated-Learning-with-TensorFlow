#! bin/sh
# todo:add mount configs
docker build -t hpc_1 -f tfjs.Dockerfile .
docker build -t hpc_2 .