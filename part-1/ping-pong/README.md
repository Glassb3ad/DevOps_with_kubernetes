## build and run locally
docker build -t ping-pong .

## Publish
docker tag ping-pong glassb3ad/ping-pong:<new tag> && docker push glassb3ad/ping-pong:<new tag>

## Pull and run
docker pull  glassb3ad/ping-pong:latest
docker run -p 4000:4000 glassb3ad/ping-pong:latest

## create kubernetes configs
kubectl apply -f manifests/