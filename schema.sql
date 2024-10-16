Create table user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) unique,
    email VARCHAR(50) unique not null,
    password VARCHAR(50)  not null
)