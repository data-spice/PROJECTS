from pathlib import Path
import random
from datetime import timedelta

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

DIAGNOSES = [
    "Malaria",
    "Pneumonia",
    "Hypertension",
    "Diabetes",
    "Tuberculosis",
    "Asthma",
    "COVID-19",
    "Appendicitis",
    "Fracture",
    "Migraine",
    "Typhoid",
    "Heart Disease",
    "Kidney Disease",
    "Cancer"
]

ADMISSION_TYPES = [
    "Emergency",
    "Elective",
    "Referral",
    "Outpatient"
]


def generate_admissions(output_dir: Path, rows: int = 120000):

    print("Loading source data...")

    hospitals = pd.read_csv(output_dir / "hospitals.csv")
    departments = pd.read_csv(output_dir / "departments.csv")
    doctors = pd.read_csv(output_dir / "doctors.csv")
    patients = pd.read_csv(output_dir / "patients.csv")

    # -------------------------------
    # Convert DataFrames to fast lookups
    # -------------------------------

    hospital_ids = hospitals["hospital_id"].tolist()
    patient_ids = patients["patient_id"].tolist()

    departments_by_hospital = (
        departments.groupby("hospital_id")["department_id"]
        .apply(list)
        .to_dict()
    )

    doctors_by_department = (
        doctors.groupby("department_id")["doctor_id"]
        .apply(list)
        .to_dict()
    )

    admissions = []

    print("Generating admissions...")

    for admission_id in range(1, rows + 1):

        hospital_id = random.choice(hospital_ids)

        department_id = random.choice(
            departments_by_hospital[hospital_id]
        )

        doctor_id = random.choice(
            doctors_by_department[department_id]
        )

        patient_id = random.choice(patient_ids)

        admission_date = fake.date_between(
            start_date="-3y",
            end_date="today"
        )

        if random.random() < 0.10:
            discharge_date = None
            status = "Admitted"
        else:
            discharge_date = (
                admission_date +
                timedelta(days=random.randint(1, 21))
            )
            status = "Discharged"

        admissions.append({

            "admission_id": admission_id,

            "patient_id": patient_id,

            "hospital_id": hospital_id,

            "doctor_id": doctor_id,

            "department_id": department_id,

            "admission_date": admission_date,

            "discharge_date": discharge_date,

            "diagnosis": random.choice(DIAGNOSES),

            "admission_type": random.choice(ADMISSION_TYPES),

            "room_number": random.randint(100, 999),

            "status": status,

            "source_file": "admissions.csv"

        })

    print("Writing CSV...")

    pd.DataFrame(admissions).to_csv(
        output_dir / "admissions.csv",
        index=False
    )

    print(f"Generated {len(admissions)} admissions.")


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[2]

    generate_admissions(
        BASE_DIR / "data" / "bronze"
    )