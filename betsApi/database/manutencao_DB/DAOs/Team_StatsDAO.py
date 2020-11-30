class Team_StatsDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def insertTeamStats(self, teamstats):

        for stat in teamstats:
            insert = "INSERT INTO team_stats (idleague, idteam, matchsPlayedHome, matchsPlayedAway, " \
                     "winsHome, winsAway, drawsHome, drawsAway, losesHome, losesAway, goalsForHome, goalsForAway, " \
                     "goalsAgainstHome, goalsAgainstAway, matchsPlayedTotal, winsTotal, drawsTotal, losesTotal, " \
                     "goalsForTotal, goalsAgainstTotal, goalsDiff, position, team_stats.group, points, forme) VALUES ( %(idleague)s," \
                     "%(idteam)s, %(matchsPlayedHome)s, %(matchsPlayedAway)s, " \
                     "%(winsHome)s, %(winsAway)s, %(drawsHome)s, %(drawsAway)s, %(losesHome)s, %(losesAway)s, " \
                     "%(goalsForHome)s, %(goalsForAway)s, %(goalsAgainstHome)s, %(goalsAgainstAway)s, " \
                     "%(matchsPlayedTotal)s, %(winsTotal)s, %(drawsTotal)s, %(losesTotal)s, %(goalsForTotal)s, " \
                     "%(goalsAgainstTotal)s, %(goalsDiff)s, %(position)s, %(group)s, %(points)s, %(forme)s ) "

            dados = {
                 'idleague': stat.idleague,
                 'idteam': stat.idteam,
                 'matchsPlayedHome': stat.matchsPlayedHome,
                 'matchsPlayedAway': stat.matchsPlayedAway,
                 'winsHome': stat.winsHome,
                 'winsAway': stat.winsAway,
                 'drawsHome': stat.drawsHome,
                 'drawsAway': stat.drawsAway,
                 'losesHome': stat.losesHome,
                 'losesAway': stat.losesAway,
                 'goalsForHome': stat.goalsForHome,
                 'goalsForAway': stat.goalsForAway,
                 'goalsAgainstHome': stat.goalsAgainstHome,
                 'goalsAgainstAway': stat.goalsAgainstAway,
                 'matchsPlayedTotal': stat.matchsPlayedTotal,
                 'winsTotal': stat.winsTotal,
                 'drawsTotal': stat.drawsTotal,
                 'losesTotal': stat.losesTotal,
                 'goalsForTotal': stat.goalsForTotal,
                 'goalsAgainstTotal': stat.goalsAgainstTotal,
                 'goalsDiff': stat.goalsDiff,
                 'position': stat.position,
                 'group': stat.group,
                 'points': stat.points,
                 'forme': stat.forme
            }

            if self.dbconnection.insert(insert, dados) :
                print("inseriu")
            else:
                print("não inseriu")