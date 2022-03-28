FROM node:14-alpine

WORKDIR /app/website

EXPOSE 3000

COPY website/ /app/website
RUN npm install

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
