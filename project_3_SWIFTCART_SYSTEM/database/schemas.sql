-- Active: 1781345151666@@127.0.0.1@5432@swiftmart_db@publiccreate 
select 'create database swiftmart_db'
where not exists(
    select 
    from pg_database
    where datname='swiftmart_db'
)\gexec

\c swiftmart_db

create extension if not exists pgcrypto;

create schema customer;

create table customer.customers(
    customer_id uuid primary key default gen_random_uuid(),
    first_name varchar(100),
    last_name varchar (100),
    email varchar(255) unique,
    phone varchar(20) unique,
    password_hash text,
    date_of_birth date,
    gender varchar(20),
    status varchar(20),
    email_verified boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint chk_gender check(gender in('male','female','non-binary','other')),
    constraint chk_status check(status in('active','suspended','deleted'))
);


create table customer.customer_addresses(
    address_id uuid primary key default gen_random_uuid(),
    customer_id  uuid not null,
    county varchar(100),
    city varchar (100),
    street varchar(200),
    postal_code varchar(20),
    is_default boolean default false,
    created_at timestamptz default now(),
    constraint fk_customer_address_customer_id 
    foreign key (customer_id)
    references customer.customers(customer_id)
    on delete cascade

);