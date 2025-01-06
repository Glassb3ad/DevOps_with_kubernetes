## build and run locally
docker build -t log-output .


## Publish
docker build -t log-output glassb3ad/log-output:<new tag> && docker push glassb3ad/log-output:<new tag>

## Pull and run
docker pull  glassb3ad/log-output:latest
docker run -p 4000:4000 glassb3ad/log-output:latest

## create deployment
kubectl create deployment log-output --image=glassb3ad/log-output