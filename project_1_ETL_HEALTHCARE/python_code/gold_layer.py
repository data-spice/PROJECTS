from pathlib import Path
from database import Database


def run_gold_layer():

    print("\n==============================")
    print("BUILDING GOLD LAYER")
    print("==============================\n")

    base_dir = Path(__file__).resolve().parent
    sql_file = base_dir.parent / "database" / "gold" / "gold_layer.sql"

    with Database() as db:

        with open(sql_file, "r") as f:
            sql = f.read().strip()

        if not sql:
            raise ValueError("gold_layer.sql is empty")

        db.cursor.execute(sql)
        db.commit()

    print("\n✔ GOLD LAYER COMPLETE")


if __name__ == "__main__":
    run_gold_layer()