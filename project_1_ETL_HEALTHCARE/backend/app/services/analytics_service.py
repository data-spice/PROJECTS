from app.database import Database


class AnalyticsService:

    @staticmethod
    def monthly_admissions():
        with Database() as db:
            db.cursor.execute("""
                SELECT *
                FROM gold.mv_monthly_admissions
                ORDER BY year, month;
            """)
            return db.cursor.fetchall()

    @staticmethod
    def bed_utilization():
        with Database() as db:
            db.cursor.execute("""
                SELECT *
                FROM gold.mv_hospital_bed_utilization
                ORDER BY hospital_name;
            """)
            return db.cursor.fetchall()

    @staticmethod
    def disease_trends():
        with Database() as db:
            db.cursor.execute("""
                SELECT *
                FROM gold.mv_disease_trends
                ORDER BY year, month;
            """)
            return db.cursor.fetchall()

    @staticmethod
    def lab_workload():
        with Database() as db:
            db.cursor.execute("""
                SELECT *
                FROM gold.mv_lab_workload
                ORDER BY year, month;
            """)
            return db.cursor.fetchall()

    @staticmethod
    def medication_inventory():
        with Database() as db:
            db.cursor.execute("""
                SELECT *
                FROM gold.mv_medication_inventory;
            """)
            return db.cursor.fetchall()