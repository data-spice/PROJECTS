import psycopg2
from psycopg2.extras import RealDictCursor

from app.config import DB_CONFIG


class Database:

    def __init__(self):
        self.connection = None
        self.cursor = None

    def connect(self):

        self.connection = psycopg2.connect(
            **DB_CONFIG,
            cursor_factory=RealDictCursor
        )

        self.cursor = self.connection.cursor()

    def commit(self):
        self.connection.commit()

    def rollback(self):
        self.connection.rollback()

    def close(self):

        if self.cursor:
            self.cursor.close()

        if self.connection:
            self.connection.close()

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_value, traceback):

        if exc_type:
            self.rollback()
        else:
            self.commit()

        self.close()