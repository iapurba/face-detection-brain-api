FROM node:10.23.0-buster

WORKDIR /face-detection-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
