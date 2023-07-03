# Creating a Cache 

Once you've [identified queries](/cache/profiling-queries) that can benefit from caching with ReadySet, use ReadySet's custom SQL commands to check if the queries are supported and then to cache supported queries in ReadySet.

## Checking query support

To view all queries that ReadySet has proxied to the upstream database and check if they can be cached in ReadySet, connect to ReadySet via the shell and run:

```
SHOW PROXIED QUERIES;
```

This command returns a virtual table with three columns:

- **QueryID:** A unique identifier for the query.
- **Proxied Query:** The text of the query being proxied.
- **ReadySet supported:** Whether or not ReadySet can cache the query.
  - If the value is `pending`, check again until you see `yes` or `no`.  If the value remains pending for more than 15 seconds, the query is unsupported.
  - If the value is `yes`, ReadySet can cache the query.
  - If the value is `no`, ReadySet cannot cache the query.


> To successfully cache the results of a query, ReadySet must support the SQL features and syntax in the query. For more details, see [SQL Support](/sql-support/supported-sql-syntax).

> If an unsupported feature is important to your use case, [submit a feature request](https://github.com/readysettech/readyset/issues/new/choose).