-- =====================================================
-- SILVER LAYER
-- 12_constraints.sql
-- Adds UNIQUE, CHECK and DEFAULT constraints
-- =====================================================

-- =====================================================
-- HOSPITALS
-- =====================================================

ALTER TABLE silver.hospitals
ADD CONSTRAINT uq_hospital_name
UNIQUE (hospital_name);

ALTER TABLE silver.hospitals
ADD CONSTRAINT chk_total_beds
CHECK (total_beds >= 0);

ALTER TABLE silver.hospitals
ADD CONSTRAINT chk_established_year
CHECK (
    established_year BETWEEN 1900
    AND EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER
);

-- =====================================================
-- DEPARTMENTS
-- =====================================================

ALTER TABLE silver.departments
ADD CONSTRAINT chk_floor_number
CHECK (floor_number >= 0);

ALTER TABLE silver.departments
ADD CONSTRAINT uq_department_per_hospital
UNIQUE (hospital_id, department_name);

-- =====================================================
-- DOCTORS
-- =====================================================

ALTER TABLE silver.doctors
ADD CONSTRAINT chk_employment_date
CHECK (employment_date <= CURRENT_DATE);

-- =====================================================
-- PATIENTS
-- =====================================================

ALTER TABLE silver.patients
ADD CONSTRAINT chk_gender
CHECK (gender IN ('M','F'));

ALTER TABLE silver.patients
ADD CONSTRAINT chk_birth_date
CHECK (date_of_birth <= CURRENT_DATE);

-- =====================================================
-- ADMISSIONS
-- =====================================================

ALTER TABLE silver.admissions
ADD CONSTRAINT chk_discharge_date
CHECK (
    discharge_date IS NULL
    OR discharge_date >= admission_date
);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

ALTER TABLE silver.pharmacy_inventory
ADD CONSTRAINT chk_quantity
CHECK (quantity_available >= 0);

ALTER TABLE silver.pharmacy_inventory
ADD CONSTRAINT chk_reorder_level
CHECK (reorder_level >= 0);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

ALTER TABLE silver.laboratory_tests
ADD CONSTRAINT chk_test_date
CHECK (test_date <= CURRENT_DATE);

-- =====================================================
-- EQUIPMENT
-- =====================================================

ALTER TABLE silver.equipment
ADD CONSTRAINT chk_maintenance_date
CHECK (maintenance_due >= purchase_date);

-- =====================================================
-- STAFF
-- =====================================================

ALTER TABLE silver.staff
ADD CONSTRAINT chk_staff_employment
CHECK (employment_date <= CURRENT_DATE);