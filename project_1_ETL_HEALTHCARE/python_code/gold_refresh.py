from database import Database


def refresh_gold():

    print("\n==============================")
    print("REFRESHING GOLD MATERIALIZED VIEWS")
    print("==============================\n")

    with Database() as db:

        db.cursor.execute("""
            REFRESH MATERIALIZED VIEW gold.mv_monthly_admissions;
            REFRESH MATERIALIZED VIEW gold.mv_hospital_bed_utilization;
            REFRESH MATERIALIZED VIEW gold.mv_disease_trends;
            REFRESH MATERIALIZED VIEW gold.mv_medication_inventory;
            REFRESH MATERIALIZED VIEW gold.mv_lab_workload;
        """)

        db.commit()

    print("\n✔ GOLD MATERIALIZED VIEWS REFRESHED")


if __name__ == "__main__":
    refresh_gold()