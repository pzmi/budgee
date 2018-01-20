create keyspace if not exists budgee
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

CREATE TABLE IF NOT EXISTS budgee.transactions (
    user_id text,
    transaction_time timeuuid,
    balance bigint,
    description text,
    details text,
    tags set<text>,
    value int,
    PRIMARY KEY (user_id, transaction_time)
) WITH CLUSTERING ORDER BY (transaction_time DESC);

CREATE TABLE IF NOT EXISTS budgee.users (
    user_id text PRIMARY KEY
);
