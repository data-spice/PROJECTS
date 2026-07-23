from pathlib import Path
import random

import pandas as pd

DEPARTMENTS = [
    "Emergency",
    "Outpatient",
    "Pediatrics",
    "Maternity",
    "Surgery",
    "Radiology",
    "Laboratory",
    "Pharmacy",
    "ICU",
    "Cardiology",
    "Orthopedics",
    "Physiotherapy",
    "Dental",
    "Oncology",
    "Dialysis"
]


def generate_departments(output_dir: Path) -> None:
    hospitals = pd.read_csv(output_dir / "hospitals.csv")

    departments = []

    department_id = 1

    for _, hospital in hospitals.iterrows():

        # Each hospital will have between 6 and 12 departments
        number_of_departments = random.randint(6, 12)

        selected_departments = random.sample(
            DEPARTMENTS,
            number_of_departments
        )

        floor = 1

        for department in selected_departments:

            departments.append({

                "department_id": department_id,

                "hospital_id": hospital["hospital_id"],

                "department_name": department,

                "floor_number": floor,

                "source_file": "departments.csv"

            })

            department_id += 1
            floor += 1

    df = pd.DataFrame(departments)

    df.to_csv(
        output_dir / "departments.csv",
        index=False
    )

    print(f"Generated {len(df)} departments.")