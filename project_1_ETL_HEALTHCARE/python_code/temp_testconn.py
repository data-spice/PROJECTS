from database import Database

with Database() as db:

    db.cursor.execute("SELECT version();")

    version = db.cursor.fetchone()

    print(version)