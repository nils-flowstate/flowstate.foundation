FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache cairo-dev pango-dev jpeg-dev giflib-dev

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_CAL_URL
ARG VITE_WA_URL
ARG VITE_WA_PHONE

RUN VITE_CAL_URL=$VITE_CAL_URL \
    VITE_WA_URL=$VITE_WA_URL \
    VITE_WA_PHONE=$VITE_WA_PHONE \
    npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
