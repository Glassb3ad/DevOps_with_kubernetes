## build

docker build -t todo-backend .

## Publish

docker build -t todo-backend . &&
docker tag todo-backend glassb3ad/todo-backend:1.4 &&
docker push glassb3ad/todo-backend:1.4

## Pull and run

docker pull glassb3ad/todo-backend:latest
docker run -p 4000:4000 glassb3ad/todo-backend:latest

## Apply kubernetes configs

kubectl apply -f manifests/
