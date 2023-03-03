# oenodrepo


<details>
<summary>About</summary>

-   [Presentation](https://www.canva.com/design/DAE693uLOIU/view)

-   [Video](https://www.youtube.com/watch?v=_IVn2aINYww)

</details>

<details>
<summary>Direct Join</summary>

<br/>


    | Params   | Type           | Description     |
    | -------- | -------------- | --------------- |
    | room     | string         | room Id         |
    | password | string/boolean | room password   |
    | name     | string         | user name       |
    | audio    | boolean        | audio stream    |
    | video    | boolean        | video stream    |
    | screen   | boolean        | screen stream   |
    | notify   | boolean        | welcome message |

</details>

<details>
<summary>Embed a meeting</summary>

<br/>
</details>

<details open>
<summary>Quick Start</summary>

<br/>

-   You will need to have `NodeJS` and all [requirements](https://mediasoup.org/documentation/v3/mediasoup/installation/#requirements) installed, this project has been tested with Node version [16.X](https://nodejs.org/en/blog/release/v16.15.0/).

-   Requirements install example for `Ubuntu 20.04`

```bash
# Gcc g++ make
$ apt-get update
$ apt-get install -y build-essential
# Python 3.8 and pip
$ DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata
$ apt install -y software-properties-common
$ add-apt-repository ppa:deadsnakes/ppa
$ apt update
$ apt install -y python3.8 python3-pip
# NodeJS 16.X and npm
$ apt install -y curl dirmngr apt-transport-https lsb-release ca-certificates
$ curl -sL https://deb.nodesource.com/setup_16.x | bash -
$ apt-get install -y nodejs
$ npm install -g npm@latest
```

-   Start the server

```bash
# Copy app/src/config.template.js in app/src/config.js and edit it if needed
$ cp app/src/config.template.js app/src/config.js
# Install dependencies - be patient, the first time will take a few minutes, in the meantime have a good coffee ;)
$ npm install
# Start the server
$ npm start
# If you want to start the server on a different port than the default use an env var
$ PORT=3011 npm start
```

-   Open in browser https://localhost:3010 or `:3011` if default port changed.

</details>

<details open>
<summary>Docker</summary>

<br/>


```bash
# Copy app/src/config.template.js in app/src/config.js IMPORTANT (edit it according to your needs)
$ cp app/src/config.template.js app/src/config.js
# Copy docker-compose.template.yml in docker-compose.yml and edit it if needed
$ cp docker-compose.template.yml docker-compose.yml
# (Optional) Get official image from Docker Hub
$ docker-compose pull
# Create and start containers
$ docker-compose up # -d
# To stop and remove resources
$ docker-compose down
```

-   Open in browser https://localhost:3010

</details>
# oenodrepo

