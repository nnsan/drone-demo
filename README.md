# Docker

The useful command

1. <code>docker ps</code> list out current running process
1. <code>docker ps -a</code> list all containers
1. <code>docker image ls</code> list all images
1. <code>docker image rm \<imageId\></code> Remove existed image
1. <code>docker build --tag \<imageTagName\> .</code> Build image from Dockerfile which location on current directory
1. <code>docker run -p 127.0.0.1:80:3000/tcp --name \<containerName\> \<imageTagName\> </code> Run the container with access port is 80
1. <code>docker start/stop \<containerName\></code> Start or Stop a container
1. <code>docker logs \<containerName\></code> Show logs inside this container
