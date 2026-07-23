from pathlib import Path
import random
from datetime import date

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

SPECIALIZATIONS = {
    "Emergency": ["Emergency Physician"],
    "Outpatient": ["General Practitioner"],
    "Pediatrics": ["Pediatrician"],
    "Maternity": ["Obstetrician", "Gynecologist"],
    "Surgery": ["General Surgeon", "Orthopedic Surgeon"],
    "Radiology": ["Radiologist"],
    "Laboratory": ["Pathologist"],
    "Pharmacy": ["Clinical Pharmacist"],
    "ICU": ["Intensivist"],
    "Cardiology": ["Cardiologist"],
    "Orthopedics": ["Orthopedic Surgeon"],
    "Physiotherapy": ["Physiotherapist"],
    "Dental": ["Dentist"],
    "Oncology": ["Oncologist"],
    "Dialysis": ["Nephrologist"]
}


def generate_doctors(output_dir: Path) -> None:

    departments = pd.read_csv(output_dir / "departments.csv")

    doctors = []

    doctor_id = 1

    for _, department in departments.iterrows():

        # Each department has 3–8 doctors
        total_doctors = random.randint(3, 8)

        department_name = department["department_name"]

        specialization = random.choice(
            SPECIALIZATIONS.get(
                department_name,
                ["General Practitioner"]
            )
        )

        for _ in range(total_doctors):

            doctors.append({

                "doctor_id": doctor_id,

                "department_id": department["department_id"],

                "first_name": fake.first_name(),

                "last_name": fake.last_name(),

                "specialization": specialization,

                "employment_date": fake.date_between(
                    start_date="-20y",
                    end_date=date.today()
                ),

                "source_file": "doctors.csv"

            })

            doctor_id += 1

    df = pd.DataFrame(doctors)

    df.to_csv(
        output_dir / "doctors.csv",
        index=False
    )

    print(f"Generated {len(df)} doctors.")