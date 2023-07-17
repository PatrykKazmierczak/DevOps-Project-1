FROM node:14
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node","server.js"]

FROM node:14

# Install Prometheus
RUN wget https://github.com/prometheus/prometheus/releases/download/v2.33.0/prometheus-2.33.0.linux-amd64.tar.gz && \
    tar -xzf prometheus-2.33.0.linux-amd64.tar.gz && \
    mv prometheus-2.33.0.linux-amd64 /usr/prometheus

# Install Grafana
RUN wget https://dl.grafana.com/oss/release/grafana-8.1.5.linux-amd64.tar.gz && \
    tar -xzf grafana-8.1.5.linux-amd64.tar.gz && \
    mv grafana-8.1.5 /usr/grafana

WORKDIR /usr/app

COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8080
EXPOSE 9090
EXPOSE 3000

COPY config/prometheus.yml /usr/prometheus/prometheus.yml
COPY config/grafana.ini /usr/grafana/conf/grafana.ini

CMD [ "sh", "-c", "/usr/prometheus/prometheus --config.file=/usr/prometheus/prometheus.yml & /usr/grafana/bin/grafana-server -config=/usr/grafana/conf/grafana.ini & npm start" ]

