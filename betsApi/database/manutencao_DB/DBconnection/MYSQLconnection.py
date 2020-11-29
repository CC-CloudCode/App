import mysql.connector
from DBconnection.DBconnection import DBconnection

class MYSQLconnection(DBconnection):
    def __init__(self, user: str, password: str, host: str, database: str):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.con = None

    def connect(self):
        self.con = mysql.connector.connect(user=self.user, password=self.password, host=self.host, database=self.database)


"""
    def renewConnection(self):
        self.con = mysql.connector.connect(user=self.user, password=self.password, host=self.host, database=self.database)"""
