# Adapter vs. Server

ReadySet ships with two components: the **adapter**, which terminates connections and proxies queries to the upstream database, and the **server**, which holds the dataflow graph in-memory and base tables on disk.

The `readyset` command either starts the ReadySet Server and Adapter as a single process on a single machine (with the `--standalone` option) or starts the ReadySet Adapter as a distinct process from the ReadySet Server.

## Usage

Start the ReadySet Server and Adapter as a single process:

```
readyset --standalone [OPTIONS]
```

Start the ReadySet Adapter and Server as distinct processes:

```
readyset-server [OPTIONS]
readyset [OPTIONS, excluding --standalone]
```

View help:

```
readyset --help
```

Print version information:

```
readyset --version
```

## Options

**`--address`**, **`-a`**

The IP address/hostname and port that ReadySet listens on.

**Env variable:** `LISTEN_ADDRESS`

**`--database-type`**

The database engine that ReadySet is integrating with.

**Possible values:** `"postgresql"`, `"mysql"`

**Env variable:** `DATABASE_TYPE`

**`--deployment`**

A unique identifier for the ReadySet deployment.

**Env variable:** `DEPLOYMENT`

**`--disable-telemetry`**

Don't sent anonymous [telemetry data](https://docs.readyset.io/reference/telemetry/) to ReadySet.

**Env variable:** `DISABLE_TELEMETRY`

**`--disable-upstream-ssl-verification`**

Disable verification of SSL certificates supplied by the upstream database on connections to replicate data and proxy queries (Postgres only, ignored for MySQL).

**Env variable:** `DISABLE_UPSTREAM_SSL_VERIFICATION`

> If invalid certificates are trusted, any certificate for any site will be trusted. Use this option with caution.

**`--forbid-full-materialization`**

ReadySet must sometimes store the entire result set for a query in memory, for example, when there is no `WHERE` filter or when the `WHERE` filter is not [parameterized](https://docs.readyset.io/reference/sql-support/#parameters) (by the user or by ReadySet). This is referred to as "full materialization".

The `--forbid-full-materialization` option prevents ReadySet from caching queries that would be fully materialized.

**Env variable:** `FORBID_FULL_MATERIALIZATION`

**`--log-format`**

Format to use when emitting log events. See the [docs for the tracing library](https://docs.rs/tracing-subscriber/latest/tracing_subscriber/fmt/index.html#formatters) for details.

**Possible values:** `"compact"`, `"full"`, `"pretty"`, `"json"`

**Default:** `"full"`

**Env variable:** `LOG_FORMAT`

**`--log-level`**

The [severity level(s)](https://docs.rs/tracing-core/0.1.30/tracing_core/metadata/struct.Level.html#implementations) to include in ReadySet logs. Messages at the specified and more severe levels are included. For example, when set to `INFO`, messages at the `INFO`, `WARN`, and `ERROR` levels are included.

Possible values, from most to least severe:

- `ERROR`: Used for hazardous situations that require special handling, where normal operation cannot proceed as expected.
- `WARN`: Used for potentially hazardous situations that may require special handling.
- `INFO`: Used for information messages that do not require action.
- `DEBUG`: Used for lower priority information.
- `TRACE`: Used for very low priority, often extremely verbose information.

> The `TRACE` level is not available for [official releases of ReadySet](https://docs.readyset.io/releases/readyset-core/), or for binaries built with the `--release` flag.

`--log-level` can be set to a comma-separated list of directives for debugging during development. For the directive syntax, see the [docs for the tracing library](https://docs.rs/tracing-subscriber/latest/tracing_subscriber/filter/struct.EnvFilter.html).

**Default:** `INFO`

**Env variable:** `LOG_LEVEL`

**`--metrics-address`**

The IP address/hostname and port of the Prometheus endpoint for [ReadySet metrics](http://docs/rustdoc/readyset_client/metrics/recorded/index.html).

This option is ignored unless [`--prometheus-metrics`](https://docs.readyset.io/reference/cli/readyset/#-prometheus-metrics) is passed. Also, when running a distributed ReadySet deployment, this option determines the Prometheus endpoint for the ReadySet Adapter only. The [`--external-address`](https://docs.readyset.io/reference/cli/readyset-server/#-external-address) option for the `readyset-server` command determines the Prometheus endpoint for the ReadySet Server.

**Default:** `0.0.0.0:6034`

**Env variable:** `METRICS_ADDRESS`

**`--password`**

The password for authenticating connections to ReadySet. This can differ from the password in the database connections string in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url).

**Default:** The password for the upstream database in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url).

**Env variable:** `ALLOWED_PASSWORD`

**`--prometheus-metrics`**

Output ReadySet metrics to the Prometheus endpoint at `<metrics address>/metrics`. The metrics address is defined by [`--metrics-address`](https://docs.readyset.io/reference/cli/readyset/#-metrics-address).

**Env variable:** `PROMETHEUS_METRICS`

**`--query-log`**

Include query-specific execution details in Prometheus metrics.

To use this option, you must pass [`--prometheus-metrics](https://docs.readyset.io/reference/cli/readyset/#-prometheus-metrics) as well.

**Env variable:** `QUERY_LOG`

**`--replication-tables`**

By default, ReadySet attempts to snapshot and replicate all tables in the database specified in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url). However, if the queries you want to cache in ReadySet access only a subset of tables in the database, you can use this option to narrow the scope accordingly. Filtering out tables that will not be used in caches will speed up the snapshotting process.

This option accepts a comma-separated list of `<schema>.<table>` (specific table in a schema) or `<schema>.*` (all tables in a schema) for Postgres and `<database>.<table>` for MySQL.

**Env variable:** `REPLICATION_TABLES`

**`--ssl-root-cert`**

Path to the PEM or DER root certificate that the upstream database connection will trust.

**Default:** System root store

**Env variable:** `SSL_ROOT_CERT`

**`--standalone`**

Run the ReadySet Server and Adapter as a single process. When this option is not passed, the `readyset` command starts just ReadySet Adapter. In this case, the ReadySet Server must be started first via the [`readyset-server`](https://docs.readyset.io/reference/cli/readyset-server/) command.

**Env variable:** `STANDALONE`

**`--upstream-db-url`**

The URL for connecting ReadySet to to the upstream database. This connection URL includes the username and password for ReadySet to authenticate with as well as the database to snapshot/replicate.

**Env variable:** `UPSTREAM_DB_URL`

> By default, ReadySet attempts to snapshot and replicate all tables in the database specified in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url).

> If the queries you want to cache in ReadySet access only a subset of tables in the database, use the [`--replication-tables`](https://docs.readyset.io/reference/cli/readyset/#-replication-tables) option to reduce disk space usage and snapshotting time.

**`--username`**, **`-u`**

The username for authenticating connections to ReadySet. This can differ from the username in the database connections string in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url).

**Default:** The username for the upstream database in [`--upstream-db-url`](https://docs.readyset.io/reference/cli/readyset/#-upstream-db-url).

**Env variable:** `ALLOWED_USERNAME`