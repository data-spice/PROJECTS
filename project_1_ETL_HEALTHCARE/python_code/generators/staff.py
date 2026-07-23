from pathlib import Path
import random
from datetime import date

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

ROLES = [
    "Nurse",
    "Clinical Officer",
    "Pharmacist",
    "Laboratory Technologist",
    "Radiographer",
    "Administrator",
    "Receptionist",
    "ICT Officer",
    "Cleaner",
    "Security Officer",
    "Driver",
    "Nutritionist",
    "Medical Records Officer"
]

SHIFTS = [
    "Day",
    "Night",
    "Rotating"
]

SALARY_GRADES = [
    "JG-A",
    "JG-B",
    "JG-C",
    "JG-D",
    "JG-E",
    "JG-F",
    "JG-G"
]


def hospital_staff_count(level):

    mapping = {
        "Level 2": (40, 70),
        "Level 3": (70, 120),
        "Level 4": (120, 220),
        "Level 5": (220, 350),
        "Level 6": (350, 600)
    }

    return mapping.get(level, (100, 150))


def generate_staff(output_dir: Path):

    print("Loading hospitals...")

    hospitals = pd.read_csv(output_dir / "hospitals.csv")

    staff = []

    staff_id = 1

    print("Generating staff...")

    for _, hospital in hospitals.iterrows():

        minimum, maximum = hospital_staff_count(
            hospital["level"]
        )

        total = random.randint(minimum, maximum)

        for _ in range(total):

            staff.append({

                "staff_id": staff_id,

                "hospital_id": hospital["hospital_id"],

                "first_name": fake.first_name(),

                "last_name": fake.last_name(),

                "role": random.choice(ROLES),

                "salary_grade": random.choice(SALARY_GRADES),

                "employment_date": fake.date_between(
                    start_date="-20y",
                    end_date=date.today()
                ),

                "shift": random.choice(SHIFTS),

                "source_file": "staff.csv"

            })

            staff_id += 1

    print("Writing CSV...")

    pd.DataFrame(staff).to_csv(
        output_dir / "staff.csv",
        index=False
    )

    print(f"Generated {len(staff)} staff records.")


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[2]

    generate_staff(
        BASE_DIR / "data" / "bronze"
    )