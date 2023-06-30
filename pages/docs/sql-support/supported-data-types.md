ReadySet takes an initial snapshot of tables from the upstream MySQL or Postgres database and then uses the database's replication stream to keep the snapshot up-to-date as the tables change.

To successfully snapshot and replicate a table, ReadySet must support the data types of the columns, the character set in which the data is encoded, and changes to the table via writes and schema changes.