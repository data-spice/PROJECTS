from pathlib import Path
import time

from hospitals import generate_hospitals
from departments import generate_departments
from doctors import generate_doctors
from patients import generate_patients
from admissions import generate_admissions
from medications import generate_medications
from inventory import generate_inventory
from laboratory import generate_laboratory_tests
from equipment import generate_equipment
from staff import generate_staff


BASE_DIR = Path(__file__).resolve().parents[2]
BRONZE_DIR = BASE_DIR / "data" / "bronze"


GENERATORS = [
    ("Hospitals", generate_hospitals),
    ("Departments", generate_departments),
    ("Doctors", generate_doctors),
    ("Patients", generate_patients),
    ("Medications", generate_medications),
    ("Admissions", generate_admissions),
    ("Inventory", generate_inventory),
    ("Laboratory Tests", generate_laboratory_tests),
    ("Equipment", generate_equipment),
    ("Staff", generate_staff),
]


def run_generator(name, func):

    print(f"\n{'=' * 70}")
    print(f"Generating {name}...")
    print(f"{'=' * 70}")

    start = time.perf_counter()

    func(BRONZE_DIR)

    end = time.perf_counter()

    print(f"{name} completed in {end - start:.2f} seconds")


def main():

    BRONZE_DIR.mkdir(parents=True, exist_ok=True)

    print("\n")
    print("#" * 70)
    print("HEALTHCARE DATA WAREHOUSE")
    print("BRONZE DATA GENERATION")
    print("#" * 70)

    total_start = time.perf_counter()

    for name, generator in GENERATORS:

        try:
            run_generator(name, generator)

        except Exception as e:

            print(f"\nERROR while generating {name}")
            print(e)
            break

    total_end = time.perf_counter()

    print("\n")
    print("#" * 70)
    print("Generation Complete")
    print(f"Total Runtime : {total_end - total_start:.2f} seconds")
    print("#" * 70)


if __name__ == "__main__":
    main()