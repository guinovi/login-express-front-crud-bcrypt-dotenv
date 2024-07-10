CREATE DATABASE IF NOT EXISTS dbLogin;
use dbLogin;

create table if not exists users(
userId int not null unique auto_increment primary key,
name varchar(50) not null,
lastname varchar(50) not null,
email varchar(50) not null unique,
username varchar(50) not null,
pass varchar(255) not null
);

