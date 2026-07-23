from database import Database
from silver_mappings import SILVER_TABLES


# -------------------------
# GENERIC TRANSFORM
# -------------------------
def transform_table(db, table_name, columns):

    print(f"Transforming {table_name}...")

    col_str = ", ".join(columns)

    query = f"""
        INSERT INTO silver.{table_name} ({col_str})
        OVERRIDING SYSTEM VALUE
        SELECT {col_str}
        FROM bronze.{table_name};
    """

    db.cursor.execute(query)

    print(f"✓ {table_name} loaded into silver")


# -------------------------
# MEDICATIONS (CRITICAL PARENT TABLE)
# -------------------------
def load_medications(db):

    print("Transforming medications...")

    db.cursor.execute("""
        INSERT INTO silver.medications (
            medication_id,
            medication_name,
            category,
            manufacturer
        )
        OVERRIDING SYSTEM VALUE
        SELECT 
            medication_id,
            medication_name,
            category,
            manufacturer
        FROM bronze.medications;
    """)

    print("✓ medications loaded into silver")


# -------------------------
# PHARMACY INVENTORY (FK SAFE)
# -------------------------
def load_pharmacy_inventory(db):

    print("Transforming pharmacy_inventory...")

    db.cursor.execute("""
        INSERT INTO silver.pharmacy_inventory (
            inventory_id,
            hospital_id,
            medication_id,
            quantity_available,
            reorder_level
        )
        OVERRIDING SYSTEM VALUE
        SELECT 
            i.inventory_id,
            i.hospital_id,
            i.medication_id,
            i.quantity_available,
            i.reorder_level
        FROM bronze.pharmacy_inventory i
        INNER JOIN silver.medications m
            ON m.medication_id = i.medication_id;
    """)

    print("✓ pharmacy_inventory loaded into silver")


# -------------------------
# MAIN PIPELINE
# -------------------------
def run_pipeline():

    print("\n==============================")
    print("BRONZE → SILVER PIPELINE (SAFE REFRESH)")
    print("==============================\n")

    LOAD_ORDER = [
        "hospitals",
        "departments",
        "doctors",
        "patients",
        "admissions",
        "equipment",
        "staff",
        "laboratory_tests",
        "medications",          # 🔥 MUST BE BEFORE PHARMACY
        "pharmacy_inventory"
    ]

    with Database() as db:

        # -------------------------
        # STEP 1: CLEAN SILVER
        # -------------------------
        print("Cleaning Silver tables...\n")

        for table in reversed(LOAD_ORDER):
            db.cursor.execute(f"TRUNCATE TABLE silver.{table} CASCADE")

        db.commit()

        print("✓ Silver tables cleared\n")

        # -------------------------
        # STEP 2: LOAD DATA
        # -------------------------
        for table_name in LOAD_ORDER:

            try:

                if table_name == "medications":
                    load_medications(db)

                elif table_name == "pharmacy_inventory":
                    load_pharmacy_inventory(db)

                else:
                    transform_table(
                        db,
                        table_name,
                        SILVER_TABLES[table_name]["columns"]
                    )

                db.commit()

                print(f"✓ {table_name} loaded into silver\n")

            except Exception as e:
                print(f"❌ Failed on {table_name}")
                print(e)
                db.rollback()

    print("\n✔ SILVER LAYER COMPLETE")


if __name__ == "__main__":
    run_pipeline()