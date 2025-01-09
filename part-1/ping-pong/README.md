## build and run locally

docker build -t ping-pong .

## Publish

docker tag ping-pong glassb3ad/ping-pong:1.3 && docker push glassb3ad/ping-pong:1.3

## Pull and run

docker pull glassb3ad/ping-pong:latest
docker run -p 4000:4000 glassb3ad/ping-pong:latest

## create kubernetes configs

kubectl apply -f manifests/
