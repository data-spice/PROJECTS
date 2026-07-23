-- =====================================================
-- SILVER LAYER
-- 14_views.sql
-- =====================================================

-- =====================================================
-- HOSPITAL SUMMARY
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_hospital_summary AS
SELECT
    hospital_id,
    hospital_name,
    county,
    level,
    total_beds,
    established_year
FROM silver.hospitals;

-- =====================================================
-- DEPARTMENT DIRECTORY
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_department_directory AS
SELECT
    d.department_id,
    d.department_name,
    d.floor_number,
    h.hospital_name,
    h.county
FROM silver.departments d
JOIN silver.hospitals h
ON d.hospital_id = h.hospital_id;

-- =====================================================
-- DOCTOR DIRECTORY
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_doctor_directory AS
SELECT
    doc.doctor_id,
    doc.first_name,
    doc.last_name,
    doc.specialization,
    dep.department_name,
    hosp.hospital_name
FROM silver.doctors doc
JOIN silver.departments dep
    ON doc.department_id = dep.department_id
JOIN silver.hospitals hosp
    ON dep.hospital_id = hosp.hospital_id;

-- =====================================================
-- PATIENT ADMISSIONS
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_patient_admissions AS
SELECT
    a.admission_id,
    p.first_name,
    p.last_name,
    h.hospital_name,
    a.admission_date,
    a.discharge_date,
    a.diagnosis
FROM silver.admissions a
JOIN silver.patients p
    ON a.patient_id = p.patient_id
JOIN silver.hospitals h
    ON a.hospital_id = h.hospital_id;

-- =====================================================
-- MEDICATION INVENTORY
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_medication_inventory AS
SELECT
    h.hospital_name,
    m.medication_name,
    i.quantity_available,
    i.reorder_level
FROM silver.pharmacy_inventory i
JOIN silver.hospitals h
    ON i.hospital_id = h.hospital_id
JOIN silver.medications m
    ON i.medication_id = m.medication_id;

-- =====================================================
-- LABORATORY RESULTS
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_laboratory_results AS
SELECT
    l.test_id,
    p.first_name,
    p.last_name,
    l.test_name,
    l.result,
    l.test_date,
    h.hospital_name
FROM silver.laboratory_tests l
JOIN silver.patients p
    ON l.patient_id = p.patient_id
JOIN silver.hospitals h
    ON l.hospital_id = h.hospital_id;

-- =====================================================
-- EQUIPMENT MAINTENANCE
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_equipment_schedule AS
SELECT
    e.equipment_name,
    h.hospital_name,
    e.purchase_date,
    e.maintenance_due
FROM silver.equipment e
JOIN silver.hospitals h
    ON e.hospital_id = h.hospital_id;

-- =====================================================
-- STAFF DIRECTORY
-- =====================================================

CREATE OR REPLACE VIEW silver.vw_staff_directory AS
SELECT
    s.staff_id,
    s.role,
    s.employment_date,
    h.hospital_name,
    h.county
FROM silver.staff s
JOIN silver.hospitals h
    ON s.hospital_id = h.hospital_id;