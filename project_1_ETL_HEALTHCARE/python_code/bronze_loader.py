from pathlib import Path
import pandas as pd

from database import Database
from config import BRONZE_DIR


def get_table_name(file_path: Path) -> str:
    """
    Converts:
    admissions.csv → bronze.admissions
    """
    return f"bronze.{file_path.stem}"


def load_csv_to_postgres(file_path: Path, db: Database):

    table_name = file_path.stem

    print(f"\nLoading {file_path.name} → bronze.{table_name}")

    # 🔥 CLEAN TABLE FIRST
    db.cursor.execute(f"TRUNCATE TABLE bronze.{table_name} RESTART IDENTITY CASCADE")

    df = pd.read_csv(file_path)
    df = df.astype(object).where(pd.notnull(df), None)

    columns = list(df.columns)
    query = f"""
        INSERT INTO bronze.{table_name} ({", ".join(columns)})
        VALUES ({", ".join(["%s"] * len(columns))})
    """

    db.cursor.executemany(query, df.values.tolist())

    print(f"Inserted {len(df)} rows into bronze.{table_name}")


def load_bronze():

    csv_files = list(BRONZE_DIR.glob("*.csv"))

    print("\n" + "=" * 60)
    print("BRONZE LOADER STARTING")
    print("=" * 60)

    with Database() as db:

        for file_path in csv_files:

            try:
                load_csv_to_postgres(file_path, db)

            except Exception as e:
                print(f"❌ Failed loading {file_path.name}")
                print(e)
                db.rollback()

    print("\n" + "=" * 60)
    print("BRONZE LOADING COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    load_bronze()