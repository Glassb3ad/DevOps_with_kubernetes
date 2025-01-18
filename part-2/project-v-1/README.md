## build

docker build -t project-v-1 .

## Publish

docker build -t project-v-1 . &&
docker tag project-v-1 glassb3ad/project-v-1:1.6 &&
docker push glassb3ad/project-v-1:1.6

## Pull and run

docker pull glassb3ad/project-v-1:latest
docker run -p 4000:4000 glassb3ad/project-v-1:latest

## Apply kubernetes configs

kubectl apply -f manifests/
