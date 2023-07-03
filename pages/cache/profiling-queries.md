# Profiling Queries

Before deciding to cache a query, it's worth investigating the performance impact each query has on your application.

There are several methods for doing so:

### [Using the built-in Grafana dashboard](/cache/profiling-queries/view-query-metrics-with-grafana-wip)

### [Use the database's slow query log](/cache/profiling-queries/view-query-metrics-with-the-databases-slow-query-log)

### [Using a third party performance monitoring tool](/cache/profiling-queries/view-query-metrics-with-3rd-party-providers-wip)

### Enabling metrics

You can use the [pg_stat_statements extension](https://www.postgresql.org/docs/current/pgstatstatements.html) to retrieve detailed information about the queries running against your Postgres instance.

Connect to your database via the shell. Run the following command to see if pg_stat_statements is installed.

```
SELECT calls, query FROM pg_stat_statements LIMIT 1;
```

If an error is returned, enable pg_stat_statments with the following command:

```
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

In some environments, the pg_stat_statements extension may not be available. In that case, run `ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';` and restart your Postgres instance before re-running the `CREATE EXTENSION` command.

To enable ReadySet metrics, start ReadySet with the following options:

- [`--prometheus-metrics`](https://docs.readyset.io/reference/cli/readyset/#-prometheus-metrics)
- [`--metrics-address`](https://docs.readyset.io/reference/cli/readyset/#-metrics-address)

To include query-specific execution metrics, also pass:

- [`--query-log`](https://docs.readyset.io/reference/cli/readyset/#-query-log)
- [`--query-log-ad-hoc`](https://docs.readyset.io/reference/cli/readyset/#-query-log-ad-hoc)

You can access ReadySet metrics at `<metrics address>/metrics`, where the metrics address is defined by the [`--metrics-address`](https://docs.readyset.io/reference/cli/readyset/#-metrics-address) option (default: `0.0.0.0:6034/metrics`).

## Analyzing per-query metrics

ReadySet can cache many `SELECT` queries.

To find `SELECT` queries with the highest latency, run:

```sql
SELECT query, calls, total_exec_time, mean_exec_time from pg_stat_statements WHERE query ILIKE '%SELECT%' order by mean_exec_time DESC;
```

Similarly, ReadySet can be used to offload high-impact queries to improve throughput.

To find the most frequently-run `SELECT` queries, run:

```sql
SELECT query, calls, total_exec_time, mean_exec_time from pg_stat_statements WHERE query ILIKE '%SELECT%' order by calls DESC;
```

To find queries that cause the most total load on the database, run:

```sql
SELECT query, calls, total_exec_time, mean_exec_time from pg_stat_statements WHERE query ILIKE '%SELECT%' order by total_exec_time DESC;
```