## build

docker build -t random-article .

## Publish

docker build -t random-article . &&
docker tag random-article glassb3ad/random-article:1.1 &&
docker push glassb3ad/random-article:1.1

## Pull and run

docker pull glassb3ad/random-article:latest
docker run glassb3ad/random-article:latest
