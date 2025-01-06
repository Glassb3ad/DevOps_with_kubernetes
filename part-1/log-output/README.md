## build and run locally
docker build -t project-v-1 .


## Publish
docker build -t project-v-1 glassb3ad/project-v-1:<new tag> && docker push glassb3ad/project-v-1:<new tag>

## Pull and run
docker pull  glassb3ad/project-v-1:latest
docker run -p 4000:4000 glassb3ad/project-v-1:latest

## create deployment
kubectl create deployment project-v-1 --image=glassb3ad/project-v-1