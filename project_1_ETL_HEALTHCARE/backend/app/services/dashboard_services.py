from app.database import Database


class DashboardService:

    @staticmethod
    def get_summary():

        with Database() as db:

            db.cursor.execute("""
                SELECT COUNT(*) AS hospitals
                FROM silver.hospitals;
            """)
            hospitals = db.cursor.fetchone()["hospitals"]

            db.cursor.execute("""
                SELECT COUNT(*) AS patients
                FROM silver.patients;
            """)
            patients = db.cursor.fetchone()["patients"]

            db.cursor.execute("""
                SELECT COUNT(*) AS doctors
                FROM silver.doctors;
            """)
            doctors = db.cursor.fetchone()["doctors"]

            db.cursor.execute("""
                SELECT COUNT(*) AS admissions
                FROM silver.admissions;
            """)
            admissions = db.cursor.fetchone()["admissions"]

        return {
            "hospitals": hospitals,
            "patients": patients,
            "doctors": doctors,
            "admissions": admissions
        }