import sys
import traceback

import mysql.connector
from DBconnection.DBconnection import DBconnection
import threading

class MYSQLconnection(DBconnection):
    def __init__(self, user: str, password: str, host: str, database: str):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.con = None
        self.lock = threading.RLock()

    def connect(self):
        self.con = mysql.connector.connect(user=self.user, password=self.password, host=self.host, database=self.database)

    def select(self, query):

        self.lock.acquire()

        cursor = None

        try:
            self.connect()
            cursor = self.con.cursor(buffered=True)

            cursor.execute(query)
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            self.lock.release()
            return cursor

    def insert(self, insert, dados):

        self.lock.acquire()

        success = False

        try:

            self.connect()
            cursor = self.con.cursor(buffered=True)

            cursor.execute(insert, dados)
            self.con.commit()
            cursor.close()
            success = True
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        finally:
            self.lock.release()
            return success
