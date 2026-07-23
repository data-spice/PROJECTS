from pathlib import Path
import random

import pandas as pd
from faker import Faker

fake = Faker("en_GB")

KENYAN_COUNTIES = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
    "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
    "Tharaka Nithi", "Embu", "Kitui", "Machakos", "Makueni",
    "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu",
    "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu",
    "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
    "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga",
    "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori",
    "Kisii", "Nyamira", "Nairobi"
]

HOSPITAL_LEVELS = [
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6"
]


def generate_hospitals(output_dir: Path, rows: int = 50) -> None:
    hospitals = []

    for hospital_id in range(1, rows + 1):
        county = random.choice(KENYAN_COUNTIES)

        hospitals.append({
            "hospital_id": hospital_id,
            "hospital_name": f"{county} General Hospital {hospital_id}",
            "county": county,
            "level": random.choice(HOSPITAL_LEVELS),
            "total_beds": random.randint(50, 1200),
            "established_year": random.randint(1965, 2022),
            "source_file": "hospitals.csv"
        })

    df = pd.DataFrame(hospitals)

    df.to_csv(
        output_dir / "hospitals.csv",
        index=False
    )

    print(f"Generated {len(df)} hospitals.")