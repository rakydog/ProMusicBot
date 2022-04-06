FROM node:12.19-slim

ENV USER=Raky Music

RUN apt-get update && \
	apt-get install -y python3 build-essential && \
	apt-get purge -y --auto-remove

RUN groupadd -r ${USER} && \
	useradd --create-home --home /home/Raky Music -r -g ${USER} ${USER}

USER ${USER}
WORKDIR /home/Raky Music

COPY package*.json ./
RUN npm install 
VOLUME [ "/home/Raky Music" ]

COPY . .

ENTRYPOINT [ "node", "index.js" ]
