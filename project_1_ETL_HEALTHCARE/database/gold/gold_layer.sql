CREATE SCHEMA IF NOT EXISTS gold;

-- =========================
-- HOSPITAL KPI VIEW
-- =========================
CREATE OR REPLACE VIEW gold.hospital_kpis AS
SELECT
    h.hospital_id,
    h.hospital_name,

    COUNT(DISTINCT a.patient_id) AS total_patients,
    COUNT(DISTINCT a.admission_id) AS total_admissions,
    COUNT(DISTINCT d.doctor_id) AS total_doctors,
    COUNT(DISTINCT s.staff_id) AS total_staff

FROM silver.hospitals h

LEFT JOIN silver.departments dep
    ON dep.hospital_id = h.hospital_id

LEFT JOIN silver.doctors d
    ON d.department_id = dep.department_id

LEFT JOIN silver.admissions a
    ON a.hospital_id = h.hospital_id

LEFT JOIN silver.staff s
    ON s.hospital_id = h.hospital_id

GROUP BY h.hospital_id, h.hospital_name;


-- =========================
-- PATIENT FLOW VIEW
-- =========================
CREATE OR REPLACE VIEW gold.patient_flow AS
SELECT
    hospital_id,
    COUNT(*) AS total_admissions,

    AVG(
        CASE 
            WHEN discharge_date IS NOT NULL 
            THEN discharge_date - admission_date
        END
    ) AS avg_stay_days

FROM silver.admissions
GROUP BY hospital_id;


-- =========================
-- DOCTOR WORKLOAD (FIXED)
-- =========================
CREATE OR REPLACE VIEW gold.doctor_workload AS
SELECT
    d.doctor_id,
    d.first_name,
    d.last_name,
    d.specialization,
    COUNT(dep.department_id) AS departments_handled

FROM silver.doctors d

LEFT JOIN silver.departments dep
    ON dep.department_id = d.department_id

GROUP BY
    d.doctor_id,
    d.first_name,
    d.last_name,
    d.specialization;