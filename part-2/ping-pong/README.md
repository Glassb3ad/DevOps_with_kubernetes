## Build and publish

docker build -t ping-pong . &&
docker tag ping-pong glassb3ad/ping-pong:1.4 &&
docker push glassb3ad/ping-pong:1.4

## Pull and run

docker pull glassb3ad/ping-pong:latest
docker run -p 4000:4000 glassb3ad/ping-pong:latest

## create kubernetes configs

kubectl apply -f manifests/
