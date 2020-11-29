class LeagueDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def selectAllLeagueIds(self):

        query = "Select idleague from league"

        cursor = self.dbconnection.select(query)

        leagueids = []

        for idleague, in cursor:
            leagueids.append(idleague)

        return leagueids
