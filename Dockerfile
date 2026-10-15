FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache cairo-dev pango-dev jpeg-dev giflib-dev

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_CAL_URL
ARG VITE_WA_URL
ARG VITE_WA_PHONE
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SUPABASE_FN_URL
ARG VITE_FLOWSTATE_APP=foundation

RUN VITE_CAL_URL=$VITE_CAL_URL \
    VITE_WA_URL=$VITE_WA_URL \
    VITE_WA_PHONE=$VITE_WA_PHONE \
    VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_SUPABASE_FN_URL=$VITE_SUPABASE_FN_URL \
    VITE_FLOWSTATE_APP=$VITE_FLOWSTATE_APP \
    npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.inc /etc/nginx/conf.d/security-headers.inc

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
