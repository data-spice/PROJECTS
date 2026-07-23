-- =====================================================
-- SILVER LAYER
-- 13_indexes.sql
-- =====================================================

-- =====================================================
-- HOSPITALS
-- =====================================================

CREATE INDEX idx_hospitals_county
ON silver.hospitals(county);

CREATE INDEX idx_hospitals_level
ON silver.hospitals(level);

-- =====================================================
-- DEPARTMENTS
-- =====================================================

CREATE INDEX idx_departments_hospital
ON silver.departments(hospital_id);

-- =====================================================
-- DOCTORS
-- =====================================================

CREATE INDEX idx_doctors_department
ON silver.doctors(department_id);

CREATE INDEX idx_doctors_specialization
ON silver.doctors(specialization);

CREATE INDEX idx_doctors_last_name
ON silver.doctors(last_name);

-- =====================================================
-- PATIENTS
-- =====================================================

CREATE INDEX idx_patients_county
ON silver.patients(county);

CREATE INDEX idx_patients_dob
ON silver.patients(date_of_birth);

-- =====================================================
-- ADMISSIONS
-- =====================================================

CREATE INDEX idx_admissions_patient
ON silver.admissions(patient_id);

CREATE INDEX idx_admissions_hospital
ON silver.admissions(hospital_id);

CREATE INDEX idx_admissions_date
ON silver.admissions(admission_date);

CREATE INDEX idx_admissions_diagnosis
ON silver.admissions(diagnosis);

-- =====================================================
-- MEDICATIONS
-- =====================================================

CREATE INDEX idx_medications_category
ON silver.medications(category);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

CREATE INDEX idx_inventory_hospital
ON silver.pharmacy_inventory(hospital_id);

CREATE INDEX idx_inventory_medication
ON silver.pharmacy_inventory(medication_id);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

CREATE INDEX idx_lab_patient
ON silver.laboratory_tests(patient_id);

CREATE INDEX idx_lab_hospital
ON silver.laboratory_tests(hospital_id);

CREATE INDEX idx_lab_test_name
ON silver.laboratory_tests(test_name);

CREATE INDEX idx_lab_test_date
ON silver.laboratory_tests(test_date);

-- =====================================================
-- EQUIPMENT
-- =====================================================

CREATE INDEX idx_equipment_hospital
ON silver.equipment(hospital_id);

CREATE INDEX idx_equipment_maintenance
ON silver.equipment(maintenance_due);

-- =====================================================
-- STAFF
-- =====================================================

CREATE INDEX idx_staff_hospital
ON silver.staff(hospital_id);

CREATE INDEX idx_staff_role
ON silver.staff(role);