# Monitoring Stack

## Overview

The ReadySet monitoring stack is comprised of four different services that collect, aggregate, and visualize the metrics that a running instance of ReadySet emits. 

- **Vector** - aggregates metrics from the ReadySet server and adapter 
- **Prometheus** - monitoring service that fetches metrics by scraping endpoints on our running vector instance
- **Pushgateway** - collects metrics in Prometheus that cannot be collected by scraping
- **Grafana** - visualize collected ReadySet metrics in your browser

## Install
### **Vector**

Next, install vector, using the the official installation [guide](https://vector.dev/docs/setup/installation/). You can either use the one line installation command which runs a script, or use the instructions for your preferred package manager or current operating system.

The one-line command is below.

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash
```

### **Prometheus**

Install Prometheus on your platform, using the official installation [guide](https://prometheus.io/docs/introduction/first_steps/).

### **Pushgateway**

To install Pushgateway, first download the binary for your platform from the releases page on Github. Then, unpack it with this command.

```shell
tar -zxvf <binary_file_name>
```

### **Grafana**

Download the binary file from Grafana for your platform. The binaries are available [here](https://grafana.com/grafana/download?platform=linux). You can also install Grafana by following the official instructions for your platform.

```shell
wget https://dl.grafana.com/enterprise/release/grafana-enterprise-9.0.6.linux-amd64.tar.gz
```

```shell
tar -zxvf grafana-enterprise-9.0.6.linux-amd64.tar.gz
```

## Configure

*Note: These example configuration files are based on our installer's template cluster which uses docker containers. Configuring these services correctly requires changing the URLs between services to match your installation.*

### **Vector**
Vector requires a few configuration files that define the transformations it should perform. These config files can be placed in any folder and are passed to vector at runtime.

`vector_aggregator.toml`
```toml
[sources.prometheus-adapter]
type = "prometheus_scrape"
endpoints = [ "http://readyset-adapter:6034/prometheus" ]
scrape_interval_secs = 2

[sources.prometheus-server]
type = "prometheus_scrape"
endpoints = [ "http://readyset-server:6033/prometheus" ]
scrape_interval_secs = 2

[transforms.metrics]
type = "remap"
inputs = ["node-exporter", "prometheus-server", "prometheus-adapter"]
source = '''
  .tags.deployment = "$deployment"
'''

# Print parsed logs to stdout
[sinks.print]
type = "console"
inputs = ["in", "metrics"]
encoding.codec = "text"

[sinks.prometheus]
type = "prometheus_exporter"
inputs = ["metrics"]
address = "0.0.0.0:9092"
```

`vector_agent.toml`
```toml
[sources.in]
type = "stdin"

[transforms.metadata]
type = "remap"
inputs = ["in"]
source = """
.hostname = get_hostname!()
"""

[sinks.out]
inputs = ["metadata"]
type = "vector"
address = "127.0.0.1:8383"
version = "1"
```

### **Prometheus**

This is the default configuration file for prometheus, `prometheus.yml` in the ReadySet monitoring stack. Copy this file in the same directory as the downloaded binaries.

```yaml
global:
  scrape_interval: 15s
  external_labels:
    monitor: 'local-readyset'

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['vector:9092']
    honor_labels: true
  - job_name: 'pushgateway'
    scrape_interval: 5s
    static_configs:
      - targets: ['pushgateway:9091']
    honor_labels: true
```

*Note: There are multiple fields that must be changed from this example file.*
- *The target domain and port (URL) for Prometheus*
- *The target domain and port (URL) for ReadySet*

### Pushgateway

No extra configuration necessary.

### **Grafana**

`grafana.ini`
```plaintext
[server]
http_port = 4000

[auth]
disable_login_form = true

[auth.anonymous]
enabled = true

org_name = Main Org.
org_role = Admin
```

`grafana_datasources.yml`
```yaml
apiVersion: 1

datasources:
  - name: DS_PROMETHEUS
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    jsonData:
      httpMethod: POST

  - name: ReadySet_DB
    type: postgres
    url: readyset-adapter:$adapter-port
    database: $db-name
    user: root
    secureJsonData:
      password: $password
    jsonData:
      sslmode: 'disable'
      postgresVersion: 903
      timescaledb: false
    editable: true
```

*Note: There are multiple fields that must be changed from this example datasources file.*
- *The domain for Prometheus*
- *The domain and port for ReadySet*
- *The ReadySet database name*
- *The ReadySet password*

## Run
Now, we can start each of the individual services in the monitoring stack by running their binaries. Once all of them are up and running, you will be able to see metrics from your ReadySet instance in Prometheus and/or Grafana.

### **Vector**
```shell
vector --config vector_aggregator.toml --config vector_agent.toml
```
### **Prometheus**
```shell
./prometheus --config.file=prometheus.yml
```

### **Pushgateway**
```shell
./pushgateway ----web.listen-address :9091
```

Check: To verify that prometheus is receiving metrics, navigate to `localhost:9090`

### **ReadySet**
Now, once the other monitoring services are up and running, we can start ReadySet with the monitoring options enabled. Specifically, pass the flags  `--prometheus-metrics --query-log --query-log-ad-hoc` to the command to run the `./readyset-mysql` binary.

## Connecting
The current ReadySet metrics stack relies on the Prometheus monitoring system to store all metrics emitted from ReadySet and uses Grafana as a visualization layer on top of those metrics. In a default ReadySet deployment, both of these services run alongside the ReadySet adapter and server.

### **Prometheus**
To connect to Prometheus, navigate to `localhost:9090`.

### **Grafana**
To connect to the Grafana dashboards, navigate to `localhost:4000`. There are three dashboards which explain the queries running in ReadySet and the associated metrics. A complete explainer of the dashboards is [here](https://docs.readyset.io/using/dashboard).
