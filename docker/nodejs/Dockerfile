FROM node:8.12

# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN npm rebuild node-sass

## TODO - find solution for this into container
# manual start this command into container
#RUN npm install --global bower
#RUN bower install --allow-root
#RUN npm install
#RUN npm run build