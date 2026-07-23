-- ==========================================================
-- GOLD MATERIALIZED VIEW LAYER (PRODUCTION READY)
-- ==========================================================

CREATE SCHEMA IF NOT EXISTS gold_mv;

-- ==========================================================
-- 1. MONTHLY ADMISSIONS
-- ==========================================================

CREATE MATERIALIZED VIEW gold_mv.mv_monthly_admissions AS
SELECT
    h.hospital_id,
    h.hospital_name,

    EXTRACT(YEAR FROM a.admission_date) AS admission_year,
    EXTRACT(MONTH FROM a.admission_date) AS admission_month,

    COUNT(*) AS total_admissions

FROM silver.admissions a

JOIN silver.hospitals h
    ON a.hospital_id = h.hospital_id

GROUP BY
    h.hospital_id,
    h.hospital_name,
    admission_year,
    admission_month;


CREATE UNIQUE INDEX idx_mv_monthly_admissions
ON gold_mv.mv_monthly_admissions
(
    hospital_id,
    admission_year,
    admission_month
);

-- ==========================================================
-- 2. HOSPITAL BED UTILIZATION
-- ==========================================================

CREATE MATERIALIZED VIEW gold_mv.mv_hospital_bed_utilization AS
SELECT
    h.hospital_id,
    h.hospital_name,
    h.total_beds,

    COUNT(a.admission_id) AS occupied_beds,

    ROUND(
        COUNT(a.admission_id)::numeric /
        NULLIF(h.total_beds, 0) * 100,
        2
    ) AS occupancy_rate

FROM silver.hospitals h

LEFT JOIN silver.admissions a
    ON h.hospital_id = a.hospital_id

GROUP BY
    h.hospital_id,
    h.hospital_name,
    h.total_beds;


CREATE UNIQUE INDEX idx_mv_bed_utilization
ON gold_mv.mv_hospital_bed_utilization(hospital_id);

-- ==========================================================
-- 3. DISEASE TRENDS
-- ==========================================================

CREATE MATERIALIZED VIEW gold_mv.mv_disease_trends AS
SELECT
    diagnosis,

    EXTRACT(YEAR FROM admission_date) AS diagnosis_year,
    EXTRACT(MONTH FROM admission_date) AS diagnosis_month,

    COUNT(*) AS total_cases

FROM silver.admissions

GROUP BY
    diagnosis,
    diagnosis_year,
    diagnosis_month;


CREATE UNIQUE INDEX idx_mv_disease
ON gold_mv.mv_disease_trends
(
    diagnosis,
    diagnosis_year,
    diagnosis_month
);

-- ==========================================================
-- 4. MEDICATION INVENTORY
-- ==========================================================

CREATE MATERIALIZED VIEW gold_mv.mv_medication_inventory AS
SELECT
    h.hospital_name,
    m.medication_name,
    i.quantity_available,
    i.reorder_level

FROM silver.pharmacy_inventory i

JOIN silver.hospitals h
    ON h.hospital_id = i.hospital_id

JOIN silver.medications m
    ON m.medication_id = i.medication_id;


CREATE INDEX idx_mv_inventory
ON gold_mv.mv_medication_inventory(hospital_name);

-- ==========================================================
-- 5. LAB WORKLOAD
-- ==========================================================

CREATE MATERIALIZED VIEW gold_mv.mv_lab_workload AS
SELECT
    hospital_id,

    EXTRACT(YEAR FROM test_date) AS test_year,
    EXTRACT(MONTH FROM test_date) AS test_month,

    COUNT(*) AS total_tests

FROM silver.laboratory_tests

GROUP BY
    hospital_id,
    test_year,
    test_month;


CREATE UNIQUE INDEX idx_mv_lab
ON gold_mv.mv_lab_workload
(
    hospital_id,
    test_year,
    test_month
);