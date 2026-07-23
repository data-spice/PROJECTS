-- =====================================================
-- SILVER LAYER
-- 01_create_tables.sql
-- Creates all tables WITHOUT foreign keys
-- =====================================================

CREATE SCHEMA IF NOT EXISTS silver;

-- =====================================================
-- HOSPITALS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.hospitals (
    hospital_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hospital_name VARCHAR(100) NOT NULL,
    county VARCHAR(100) NOT NULL,
    level VARCHAR(30) NOT NULL,
    total_beds INTEGER NOT NULL,
    established_year SMALLINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DEPARTMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.departments (
    department_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hospital_id INTEGER NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    floor_number INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DOCTORS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.doctors (
    doctor_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    department_id INTEGER NOT NULL,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    specialization VARCHAR(100),
    employment_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PATIENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.patients (
    patient_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    gender CHAR(1),
    date_of_birth DATE,
    county VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ADMISSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.admissions (
    admission_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    patient_id INTEGER NOT NULL,
    hospital_id INTEGER NOT NULL,

    admission_date DATE,
    discharge_date DATE,

    diagnosis VARCHAR(200),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- MEDICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.medications (
    medication_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    medication_name VARCHAR(150),
    category VARCHAR(100),
    manufacturer VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.pharmacy_inventory (
    inventory_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    hospital_id INTEGER,
    medication_id INTEGER,

    quantity_available INTEGER,
    reorder_level INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.laboratory_tests (
    test_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    patient_id INTEGER,
    hospital_id INTEGER,

    test_name VARCHAR(150),
    test_date DATE,
    result VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EQUIPMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.equipment (
    equipment_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    hospital_id INTEGER,

    equipment_name VARCHAR(150),
    purchase_date DATE,
    maintenance_due DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STAFF
-- =====================================================

CREATE TABLE IF NOT EXISTS silver.staff (
    staff_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    hospital_id INTEGER,

    role VARCHAR(100),
    employment_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);