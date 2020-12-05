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
                print("inseriu teamstats")
            else:
                print("não inseriu teamstats")


    def updateTeamStats(self, teamstats):

        for stat in teamstats:

            update = "UPDATE team_stats set idteam_stats = %(idteam_stats)s , idleague = %(idleague)s , idteam = %(" \
                     "idteam)s , matchsPlayedHome = %(matchsPlayedHome)s , matchsPlayedAway = %(matchsPlayedAway)s , " \
                     "winsHome = %(winsHome)s , winsAway = %(winsAway)s , drawsHome = %(drawsHome)s , drawsAway = %(" \
                     "drawsAway)s , losesHome = %(losesHome)s , losesAway = %(losesAway)s , goalsForHome = %(" \
                     "goalsForHome)s , goalsForAway = %(goalsForAway)s , goalsAgainstHome = %(goalsAgainstHome)s , " \
                     "goalsAgainstAway = %(goalsAgainstAway)s , matchsPlayedTotal = %(matchsPlayedTotal)s , " \
                     "winsTotal = %(winsTotal)s , drawsTotal = %(drawsTotal)s , losesTotal = %(losesTotal)s , " \
                     "goalsForTotal = %(goalsForTotal)s , goalsAgainstTotal = %(goalsAgainstTotal)s , goalsDiff = %(" \
                     "goalsDiff)s , position = %(position)s , team_stats.group = %(group)s , points = %(points)s , " \
                     "forme = %(forme)s where idleague = %(idleague)s and idteam = %(idteam)s; "

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

            if self.dbconnection.insert(update, dados):
                print("atualizou teamstats")
            else:
                print("não atualizou teamstats")