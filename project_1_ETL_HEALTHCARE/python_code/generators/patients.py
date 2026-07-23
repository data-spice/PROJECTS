from pathlib import Path
import random
from datetime import date

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

COUNTIES = [
    "Nairobi", "Kiambu", "Nakuru", "Kisumu", "Mombasa",
    "Uasin Gishu", "Machakos", "Meru", "Nyeri", "Kakamega",
    "Kilifi", "Bungoma", "Busia", "Siaya", "Kericho",
    "Narok", "Migori", "Embu", "Kitui", "Murang'a"
]

BLOOD_GROUPS = [
    "A+","A-",
    "B+","B-",
    "AB+","AB-",
    "O+","O-"
]

GENDERS = ["M","F"]

MARITAL_STATUS = [
    "Single",
    "Married",
    "Divorced",
    "Widowed"
]


def generate_patients(
        output_dir: Path,
        rows: int = 20000
):

    patients = []

    for patient_id in range(1, rows + 1):

        gender = random.choice(GENDERS)

        patients.append({

            "patient_id": patient_id,

            "first_name": fake.first_name_male()
                if gender == "M"
                else fake.first_name_female(),

            "last_name": fake.last_name(),

            "gender": gender,

            "date_of_birth": fake.date_between(
                start_date="-90y",
                end_date="-1d"
            ),

            "county": random.choice(COUNTIES),

            "blood_group": random.choice(BLOOD_GROUPS),

            "marital_status": random.choice(MARITAL_STATUS),

            "phone_number": fake.phone_number(),

            "national_id": random.randint(
                10000000,
                49999999
            ),

            "registration_date": fake.date_between(
                start_date="-5y",
                end_date=date.today()
            ),

            "source_file": "patients.csv"

        })

    df = pd.DataFrame(patients)

    df.to_csv(
        output_dir / "patients.csv",
        index=False
    )

    print(f"Generated {len(df)} patients.")