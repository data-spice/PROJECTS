from pathlib import Path
import random

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

TESTS = [
    "Complete Blood Count",
    "Blood Sugar",
    "Liver Function Test",
    "Kidney Function Test",
    "Malaria Test",
    "COVID-19 PCR",
    "Urinalysis",
    "HIV Test",
    "Tuberculosis Test",
    "Lipid Profile",
    "Pregnancy Test",
    "Electrolyte Panel",
    "Blood Culture",
    "Stool Analysis",
    "Thyroid Function Test"
]

RESULTS = [
    "Normal",
    "Abnormal",
    "Positive",
    "Negative",
    "Inconclusive"
]

STATUS = [
    "Completed",
    "Pending",
    "Cancelled"
]


def generate_laboratory_tests(output_dir: Path, rows: int = 150000):

    print("Loading source data...")

    hospitals = pd.read_csv(output_dir / "hospitals.csv")
    patients = pd.read_csv(output_dir / "patients.csv")
    departments = pd.read_csv(output_dir / "departments.csv")
    doctors = pd.read_csv(output_dir / "doctors.csv")

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

    tests = []

    print("Generating laboratory tests...")

    for test_id in range(1, rows + 1):

        hospital_id = random.choice(hospital_ids)

        department_id = random.choice(
            departments_by_hospital[hospital_id]
        )

        doctor_id = random.choice(
            doctors_by_department[department_id]
        )

        tests.append({

            "test_id": test_id,

            "patient_id": random.choice(patient_ids),

            "hospital_id": hospital_id,

            "doctor_id": doctor_id,

            "test_name": random.choice(TESTS),

            "test_date": fake.date_between(
                start_date="-3y",
                end_date="today"
            ),

            "result": random.choice(RESULTS),

            "test_status": random.choice(STATUS),

            "technician": fake.name(),

            "source_file": "laboratory_tests.csv"

        })

    print("Writing CSV...")

    pd.DataFrame(tests).to_csv(
        output_dir / "laboratory_tests.csv",
        index=False
    )

    print(f"Generated {len(tests)} laboratory tests.")


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[2]

    generate_laboratory_tests(
        BASE_DIR / "data" / "bronze"
    )