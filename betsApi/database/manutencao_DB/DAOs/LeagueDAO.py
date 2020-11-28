class LeagueDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def selectAllLeagueIds(self):
        self.dbconnection.connect()

        query = "Select idleague from league"

        cursor = self.dbconnection.con.cursor(buffered=True)

        cursor.execute(query)

        leagueids = []

        for (idleague) in cursor:
            leagueids.append(idleague)

        return leagueids
