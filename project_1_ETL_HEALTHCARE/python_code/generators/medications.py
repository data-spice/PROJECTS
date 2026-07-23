from pathlib import Path
import random

import pandas as pd

MEDICATIONS = [
    ("Paracetamol", "Analgesic", "Tablet"),
    ("Ibuprofen", "NSAID", "Tablet"),
    ("Amoxicillin", "Antibiotic", "Capsule"),
    ("Azithromycin", "Antibiotic", "Tablet"),
    ("Ceftriaxone", "Antibiotic", "Injection"),
    ("Metformin", "Antidiabetic", "Tablet"),
    ("Insulin", "Antidiabetic", "Injection"),
    ("Amlodipine", "Antihypertensive", "Tablet"),
    ("Losartan", "Antihypertensive", "Tablet"),
    ("Salbutamol", "Bronchodilator", "Inhaler"),
    ("Omeprazole", "Gastrointestinal", "Capsule"),
    ("Hydrocortisone", "Steroid", "Injection"),
    ("Morphine", "Analgesic", "Injection"),
    ("Artemether", "Antimalarial", "Injection"),
    ("Artemether-Lumefantrine", "Antimalarial", "Tablet"),
    ("Fluconazole", "Antifungal", "Capsule"),
    ("Ciprofloxacin", "Antibiotic", "Tablet"),
    ("Gentamicin", "Antibiotic", "Injection"),
    ("Vitamin C", "Supplement", "Tablet"),
    ("Zinc Sulphate", "Supplement", "Tablet")
]

MANUFACTURERS = [
    "Universal Corporation",
    "Cosmos",
    "Dawa",
    "Beta Healthcare",
    "Laborate",
    "GSK",
    "Pfizer",
    "Novartis",
    "Sanofi",
    "Roche"
]


def generate_medications(output_dir: Path):

    medications = []

    medication_id = 1

    for _ in range(15):  # 20 × 15 = 300 rows

        for name, category, dosage in MEDICATIONS:

            medications.append({

                "medication_id": medication_id,

                "medication_name": name,

                "category": category,

                "manufacturer": random.choice(MANUFACTURERS),

                "dosage_form": dosage,

                "unit_price": round(
                    random.uniform(20, 5000),
                    2
                ),

                "source_file": "medications.csv"

            })

            medication_id += 1

    df = pd.DataFrame(medications)

    df.to_csv(
        output_dir / "medications.csv",
        index=False
    )

    print(f"Generated {len(df)} medications.")