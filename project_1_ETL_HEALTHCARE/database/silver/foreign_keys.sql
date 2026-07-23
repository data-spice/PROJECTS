-- =====================================================
-- SILVER LAYER
-- 11_foreign_keys.sql
-- =====================================================

-- =====================================================
-- DEPARTMENTS → HOSPITALS
-- =====================================================

ALTER TABLE silver.departments
ADD CONSTRAINT fk_departments_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);

-- =====================================================
-- DOCTORS → DEPARTMENTS
-- =====================================================

ALTER TABLE silver.doctors
ADD CONSTRAINT fk_doctors_department
FOREIGN KEY (department_id)
REFERENCES silver.departments(department_id);

-- =====================================================
-- ADMISSIONS → PATIENTS
-- =====================================================

ALTER TABLE silver.admissions
ADD CONSTRAINT fk_admissions_patient
FOREIGN KEY (patient_id)
REFERENCES silver.patients(patient_id);

ALTER TABLE silver.admissions
ADD CONSTRAINT fk_admissions_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);

-- =====================================================
-- PHARMACY INVENTORY
-- =====================================================

ALTER TABLE silver.pharmacy_inventory
ADD CONSTRAINT fk_inventory_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);

ALTER TABLE silver.pharmacy_inventory
ADD CONSTRAINT fk_inventory_medication
FOREIGN KEY (medication_id)
REFERENCES silver.medications(medication_id);

-- =====================================================
-- LABORATORY TESTS
-- =====================================================

ALTER TABLE silver.laboratory_tests
ADD CONSTRAINT fk_laboratory_patient
FOREIGN KEY (patient_id)
REFERENCES silver.patients(patient_id);

ALTER TABLE silver.laboratory_tests
ADD CONSTRAINT fk_laboratory_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);

-- =====================================================
-- EQUIPMENT
-- =====================================================

ALTER TABLE silver.equipment
ADD CONSTRAINT fk_equipment_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);

-- =====================================================
-- STAFF
-- =====================================================

ALTER TABLE silver.staff
ADD CONSTRAINT fk_staff_hospital
FOREIGN KEY (hospital_id)
REFERENCES silver.hospitals(hospital_id);