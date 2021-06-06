# Docker

The useful command

1. <code>docker ps</code> list out current running process
1. <code>docker ps -a</code> list all containers
1. <code>docker image ls</code> list all images
1. <code>docker image rm \<imageId\></code> Remove existed image
1. <code>docker build --tag \<imageTagName\> .</code> Build image from Dockerfile which location on current directory
1. <code>docker run -p 8080:3000/tcp --name \<containerName\> \<imageTagName\> </code> Run the container with access port is 80
1. <code>docker start/stop \<containerName\></code> Start or Stop a container
1. <code>docker logs \<containerName\></code> Show logs inside this container

## Docker Login

We can use username and password to login or use access token

1. <code>docker login -u nnsan1989</code> login docker hub with username is nnsan1989
1. Enter Access Token <code>4709b796-af7e-??0f-b79a-c22675f02e0c</code> as alternative password refer [link](https://hub.docker.com/settings/security)
1. <code>docker tag \<local imageName\> \<repositoryName\>:\<tag\></code>. For example <code>docker tag react-demo-app nnsan1989/react-demo-app:v1.0.0</code>
1. <code>docker push \<repositoryName\>:\<tag\></code> one repository may have many tags. For example <code>nnsan1989/react-demo-app:v1.0.0</code>

# Drone

## Setup Drone Server

1. Pull drone server on repository by <code>docker pull drone/drone:1</code>
1. Create environment file <code>.env.server</code> and set all needed environment in this file
1. <code>export $(cat .env.server)</code> this will create appropriated environment variables in .env.server file. After that execute command to start drone container
 <code>
 docker run \
   --volume=/var/lib/drone:/data \
   --env=DRONE_GITHUB_CLIENT_ID \
   --env=DRONE_GITHUB_CLIENT_SECRET \
   --env=DRONE_RPC_SECRET \
   --env=DRONE_SERVER_HOST \
   --env=DRONE_SERVER_PROTO \
   --publish=8080:80 \
   --restart=always \
   --detach=true \
   --name=drone \
   drone/drone:1
 </code>
1. Or we can use <code>--env-file</code> by this command
 <code>
  docker run \
    --volume=/var/lib/drone:/data \
    --env-file=.env.server \
    --publish=8080:80 \
    --publish=443:443 \
    --restart=always \
    --detach=true \
    --name=drone \
    drone/drone:1
  </code>
1. Open browser with url is <code>{{DRONE_SERVER_PROTO}}://{{DRONE_SERVER_HOST}}</code> and it will redirect to github login page
1. The Drone Dashboard will show after login successfully and you need to choose which repository is active
1. Access to the Webhook setting of chosen repository to configure relevant event.
1. We need and .drone.yml file in the root directory of appropriate repository to runner can execute pipeline

## Setup Drone Runner

1. Execute command to start runner with the environment variable have been saved
 <code>
 docker run -d \
   -v /var/run/docker.sock:/var/run/docker.sock \
   -e DRONE_RPC_PROTO \
   -e DRONE_RPC_HOST \
   -e DRONE_RPC_SECRET \
   -e DRONE_RUNNER_CAPACITY=2 \
   -e DRONE_RUNNER_NAME=${HOSTNAME} \
   -p 3000:3000 \
   --restart always \
   --name drone-runner \
   drone/drone-runner-docker:1
 </code>
1. Or we can use <code>--env-file</code>
 <code>
 docker run -d \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --env-file=.env.runner \
    -e DRONE_RUNNER_CAPACITY=2 \
    -e DRONE_RUNNER_NAME=${HOSTNAME} \
    -p 3000:3000 \
    --restart always \
    --name drone-runner \
    drone/drone-runner-docker:1
 </code>

# GIT authentication by ssh

Run <code>ssh-add ~/.ssh/github_nnsan1989</code> to authenticate
