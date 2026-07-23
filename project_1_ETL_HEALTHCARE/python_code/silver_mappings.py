SILVER_TABLES = {

    # -------------------------
    # HOSPITALS
    # -------------------------
    "hospitals": {
        "columns": [
            "hospital_id",
            "hospital_name",
            "county",
            "level",
            "total_beds",
            "established_year"
        ]
    },

    # -------------------------
    # PATIENTS
    # -------------------------
    "patients": {
        "columns": [
            "patient_id",
            "first_name",
            "last_name",
            "gender",
            "date_of_birth",
            "county"
        ]
    },

    # -------------------------
    # DOCTORS
    # -------------------------
    "doctors": {
        "columns": [
            "doctor_id",
            "department_id",
            "first_name",
            "last_name",
            "specialization",
            "employment_date"
        ]
    },

    # -------------------------
    # DEPARTMENTS
    # -------------------------
    "departments": {
        "columns": [
            "department_id",
            "hospital_id",
            "department_name",
            "floor_number"
        ]
    },

    # -------------------------
    # ADMISSIONS
    # -------------------------
    "admissions": {
        "columns": [
            "admission_id",
            "patient_id",
            "hospital_id",
            "admission_date",
            "discharge_date",
            "diagnosis"
        ]
    },

    # -------------------------
    # EQUIPMENT
    # -------------------------
    "equipment": {
        "columns": [
            "equipment_id",
            "hospital_id",
            "equipment_name",
            "purchase_date",
            "maintenance_due"
        ]
    },

    # -------------------------
    # STAFF
    # -------------------------
    "staff": {
        "columns": [
            "staff_id",
            "hospital_id",
            "role",
            "employment_date"
        ]
    },

    # -------------------------
    # LABORATORY TESTS
    # -------------------------
    "laboratory_tests": {
        "columns": [
            "test_id",
            "patient_id",
            "hospital_id",
            "test_name",
            "test_date",
            "result"
        ]
    },

    # -------------------------
    # PHARMACY INVENTORY
    # -------------------------
    "pharmacy_inventory": {
        "columns": [
            "inventory_id",
            "hospital_id",
            "medication_id",
            "quantity_available",
            "reorder_level"
        ]
    }
}