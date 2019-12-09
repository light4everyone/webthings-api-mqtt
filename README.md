docker build -t light4everyone/webthingnode .

docker run -d --rm -p 8888:8888 --name webthingnode light4everyone/webthingnode


docker run -d --rm -p 8080:8080 -p 4443:4443 -v /opt/docker/webthings-gateway:/home/node/.mozilla-iot --name webthings-gateway mozillaiot/gateway:latest