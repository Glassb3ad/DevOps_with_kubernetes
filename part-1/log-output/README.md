## build and run locally

docker build -t log-output .

## Publish

docker tag log-output glassb3ad/log-output:1.3 && docker push glassb3ad/log-output:1.3

## Pull and run

docker pull glassb3ad/log-output:latest
docker run -p 4000:4000 glassb3ad/log-output:latest

## create deployment

kubectl create deployment log-output --image=glassb3ad/log-output
