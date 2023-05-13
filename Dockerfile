FROM node:16-alpine
WORKDIR /app
COPY ./next.config.js .
COPY ./public ./public
COPY ./.next/static ./.next/static
COPY ./.next/standalone .
CMD ["server.js"]