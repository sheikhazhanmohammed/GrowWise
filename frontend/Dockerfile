# pull official base image
FROM node:latest

# set working directory
WORKDIR /app
EXPOSE 5173

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]    