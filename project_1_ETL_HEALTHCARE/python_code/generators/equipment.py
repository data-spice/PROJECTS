from pathlib import Path
import random
from datetime import timedelta

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

EQUIPMENT = [
    "MRI Scanner",
    "CT Scanner",
    "X-Ray Machine",
    "Ultrasound Machine",
    "ECG Machine",
    "Ventilator",
    "Patient Monitor",
    "Infusion Pump",
    "Dialysis Machine",
    "Defibrillator",
    "Anesthesia Machine",
    "Operating Table",
    "Hospital Bed",
    "Oxygen Concentrator",
    "Incubator"
]

MANUFACTURERS = [
    "GE Healthcare",
    "Philips",
    "Siemens",
    "Mindray",
    "Dräger",
    "Medtronic",
    "Baxter",
    "Fresenius"
]

STATUS = [
    "Operational",
    "Under Maintenance",
    "Out of Service"
]


def generate_equipment(output_dir: Path):

    print("Loading hospitals...")

    hospitals = pd.read_csv(output_dir / "hospitals.csv")

    hospital_ids = hospitals["hospital_id"].tolist()

    equipment = []

    equipment_id = 1

    print("Generating equipment...")

    for hospital_id in hospital_ids:

        total = random.randint(80, 120)

        for _ in range(total):

            purchase = fake.date_between(
                start_date="-15y",
                end_date="-30d"
            )

            equipment.append({

                "equipment_id": equipment_id,

                "hospital_id": hospital_id,

                "equipment_name": random.choice(EQUIPMENT),

                "manufacturer": random.choice(MANUFACTURERS),

                "purchase_date": purchase,

                "maintenance_due": purchase + timedelta(
                    days=random.randint(180, 730)
                ),

                "status": random.choice(STATUS),

                "cost": round(
                    random.uniform(25000, 25000000),
                    2
                ),

                "source_file": "equipment.csv"

            })

            equipment_id += 1

    print("Writing CSV...")

    pd.DataFrame(equipment).to_csv(
        output_dir / "equipment.csv",
        index=False
    )

    print(f"Generated {len(equipment)} equipment records.")


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[2]

    generate_equipment(
        BASE_DIR / "data" / "bronze"
    )