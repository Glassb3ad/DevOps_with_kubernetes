## build and run locally

docker build -t log-output-reader .

## Publish

docker tag log-output-reader glassb3ad/log-output-reader:1.1 && docker push glassb3ad/log-output-reader:1.1

## Pull and run

docker pull glassb3ad/log-output-reader:latest
docker run -p 4000:4000 glassb3ad/log-output-reader:latest
