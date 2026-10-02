FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Nur öffentliche Werte (landen im Browser-Bundle). Secrets gehören hier nie hinein.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SUPABASE_FN_URL
ARG VITE_FLOWSTATE_APP
ARG VITE_CAL_URL
ARG VITE_WA_URL
ARG VITE_WA_PHONE

RUN VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_SUPABASE_FN_URL=$VITE_SUPABASE_FN_URL \
    VITE_FLOWSTATE_APP=$VITE_FLOWSTATE_APP \
    VITE_CAL_URL=$VITE_CAL_URL \
    VITE_WA_URL=$VITE_WA_URL \
    VITE_WA_PHONE=$VITE_WA_PHONE \
    npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.inc /etc/nginx/conf.d/security-headers.inc

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider -q http://127.0.0.1:3001/ || exit 1
