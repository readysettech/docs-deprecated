# Connect via Database Shell

## Postgres

### 1. Connect to ReadySet using psql, the Postgres client

ReadySet is wire-compatible with Postgres, so you can use `psql` to connect to it in the same way you would an ordinary database.

ReadySet uses the same username, password and database name as your upstream database, so to connect, fill in those values in your connection string and run:

```sh
psql 'postgresql://<username>:<password>@127.0.0.1:5433/<database name>'
```

Once connected, you can see the status of tables in ReadySet by running:

```sql
testdb=> SHOW READYSET STATUS;
```

## MySQL

### 1. Connect to ReadySet using the MySQL client

ReadySet is wire-compatible with MySQL, so you can use the `mysql` client to connect to it in the same way you would an ordinary database.

ReadySet uses the same username, password and database name as your upstream database.  To connect, fill in those values and run:

```sh
mysql 'mysql://<username>:<password>@<host>:<port>/<db_name>'
```

Once connected, you can see the status of tables in ReadySet by running:

```sql
testdb=> SHOW READYSET STATUS;
```

[You can also use the shell to view and cache queries](/docs/cache/creating-a-cache)