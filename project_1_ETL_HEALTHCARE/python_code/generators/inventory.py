from pathlib import Path
import random
from datetime import date

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

SUPPLIERS = [
    "KEMSA",
    "Mission for Essential Drugs",
    "Lab & Allied",
    "Harleys Limited",
    "Revital Healthcare",
    "Phillips Healthcare",
    "Surgipharm",
    "Medisel Kenya"
]


def generate_inventory(output_dir: Path):

    print("Loading source data...")

    hospitals = pd.read_csv(output_dir / "hospitals.csv")
    medications = pd.read_csv(output_dir / "medications.csv")

    hospital_ids = hospitals["hospital_id"].tolist()

    medication_ids = medications["medication_id"].tolist()

    inventory = []

    inventory_id = 1

    print("Generating pharmacy inventory...")

    for hospital_id in hospital_ids:

        # Each hospital stocks between 180 and 260 medications
        stocked_medications = random.sample(
            medication_ids,
            random.randint(
                180,
                min(260, len(medication_ids))
            )
        )

        for medication_id in stocked_medications:

            quantity = random.randint(0, 5000)

            reorder_level = random.randint(100, 500)

            inventory.append({

                "inventory_id": inventory_id,

                "hospital_id": hospital_id,

                "medication_id": medication_id,

                "quantity_available": quantity,

                "reorder_level": reorder_level,

                "supplier": random.choice(SUPPLIERS),

                "last_stock_update": fake.date_between(
                    start_date="-90d",
                    end_date=date.today()
                ),

                "source_file": "pharmacy_inventory.csv"

            })

            inventory_id += 1

    print("Writing CSV...")

    pd.DataFrame(inventory).to_csv(
        output_dir / "pharmacy_inventory.csv",
        index=False
    )

    print(f"Generated {len(inventory)} inventory records.")


if __name__ == "__main__":

    BASE_DIR = Path(__file__).resolve().parents[2]

    generate_inventory(
        BASE_DIR / "data" / "bronze"
    )