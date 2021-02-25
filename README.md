# Self-Monitoring Application

The address at which the application can currently be accessed at [https://wsd-self-monitor.herokuapp.com/]

There are two tables used by the application which are joined with each other using **"user_id"**, which you can create using following SQL Commands:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepDuration FLOAT,
  sleepQuality INTEGER,
  exerciseTime FLOAT,
  studyTime FLOAT,
  qualityOfEating INTEGER,
  morningMood INTEGER,
  eveningMood INTEGER,
  user_id INTEGER REFERENCES users(id)
);

CREATE INDEX ON reports(date);

```

After creating the table, you need to create an **.env** file in which you can add your database credentials as follow (make sure not to use inverted commas and comma):

```
# .env
hostname=hostname-possibly-at-elephantsql.com
database=database-name
user=user-name-typically-same-as-database-name
password=password
port=5432
```

To run this project locally, you need yo download the repository and open the terminal navigate to the root folder of project and run using below command:
```
deno run --allow-env --allow-net --allow-read --allow-write --unstable app.js

```

To run the tests in project, navigate to the root folder on terminal and run using below command:
```
deno test --allow-env --allow-read --allow-net --unstable
```



