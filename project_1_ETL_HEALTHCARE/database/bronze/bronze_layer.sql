DROP TABLE IF EXISTS bronze.staff CASCADE;
DROP TABLE IF EXISTS bronze.equipment CASCADE;
DROP TABLE IF EXISTS bronze.laboratory_tests CASCADE;
DROP TABLE IF EXISTS bronze.pharmacy_inventory CASCADE;
DROP TABLE IF EXISTS bronze.medications CASCADE;
DROP TABLE IF EXISTS bronze.admissions CASCADE;
DROP TABLE IF EXISTS bronze.patients CASCADE;
DROP TABLE IF EXISTS bronze.doctors CASCADE;
DROP TABLE IF EXISTS bronze.departments CASCADE;
DROP TABLE IF EXISTS bronze.hospitals CASCADE;

-- =====================================================
-- BRONZE LAYER
-- Database: healthcare_dw
-- Schema: bronze
-- Raw landing zone
-- =====================================================

CREATE SCHEMA IF NOT EXISTS bronze;

-- =====================================================
-- HOSPITALS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.hospitals (
    hospital_id INTEGER,
    hospital_name VARCHAR(150),
    county VARCHAR(100),
    level VARCHAR(20),
    total_beds INTEGER,
    established_year SMALLINT,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DEPARTMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.departments (
    department_id INTEGER,
    hospital_id INTEGER,
    department_name VARCHAR(100),
    floor_number INTEGER,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DOCTORS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.doctors (
    doctor_id INTEGER,
    department_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    specialization VARCHAR(100),
    employment_date DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PATIENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.patients (
    patient_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    gender CHAR(1),
    date_of_birth DATE,
    county VARCHAR(100),
    blood_group VARCHAR(5),
    marital_status VARCHAR(20),
    phone_number VARCHAR(20),
    national_id BIGINT,
    registration_date DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ADMISSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.admissions (
    admission_id BIGINT,
    patient_id INTEGER,
    hospital_id INTEGER,
    doctor_id INTEGER,
    department_id INTEGER,
    admission_date DATE,
    discharge_date DATE,
    diagnosis VARCHAR(200),
    admission_type VARCHAR(30),
    room_number VARCHAR(20),
    status VARCHAR(30),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- MEDICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.medications (
    medication_id INTEGER,
    medication_name VARCHAR(150),
    category VARCHAR(100),
    manufacturer VARCHAR(150),
    dosage_form VARCHAR(50),
    unit_price NUMERIC(10,2),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.pharmacy_inventory (
    inventory_id BIGINT,
    hospital_id INTEGER,
    medication_id INTEGER,
    quantity_available INTEGER,
    reorder_level INTEGER,
    supplier VARCHAR(150),
    last_stock_update DATE,
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.laboratory_tests (
    test_id BIGINT,
    patient_id INTEGER,
    hospital_id INTEGER,
    doctor_id INTEGER,
    test_name VARCHAR(150),
    test_date DATE,
    result VARCHAR(100),
    test_status VARCHAR(30),
    technician VARCHAR(150),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EQUIPMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.equipment (
    equipment_id INTEGER,
    hospital_id INTEGER,
    equipment_name VARCHAR(150),
    manufacturer VARCHAR(150),
    purchase_date DATE,
    maintenance_due DATE,
    status VARCHAR(50),
    cost NUMERIC(12,2),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STAFF
-- =====================================================

CREATE TABLE IF NOT EXISTS bronze.staff (
    staff_id INTEGER,
    hospital_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(100),
    salary_grade VARCHAR(20),
    employment_date DATE,
    shift VARCHAR(20),
    source_file VARCHAR(255),
    ingestion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);