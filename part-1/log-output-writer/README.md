## build and run locally

docker build -t log-output-writer .

## Publish

docker tag log-output-writer glassb3ad/log-output-writer:1.1 && docker push glassb3ad/log-output-writer:1.1

## Pull and run

docker pull glassb3ad/log-output-writer:latest
docker run -p 4000:4000 glassb3ad/log-output-writer:latest

## apply deployment

kubectl apply -f manifests/deployment.yaml
