import threading
from APICommunication.APICommunication import APICommunication
from DAOs.Team_StatsDAO import Team_StatsDAO
from DAOs.LeagueDAO import LeagueDAO
import time

class Team_Stats_Updater(threading.Thread):
    def __init__(self, api: APICommunication, teamstatsdao: Team_StatsDAO, leaguedao: LeagueDAO):
        super().__init__()
        self.iddletime = 12 * 60 * 60
        self.api = api
        self.alive = True
        self.teamstatsdao = teamstatsdao
        self.leaguedao = leaguedao

    def run(self):
        while self.alive:

            leagueids = self.leaguedao.selectAllLeagueIds()

            # talvez paralelizar isto no futuro

            teamstats = []

            for leagueid in leagueids:
                teamstats.extend(self.api.getTeamStats(leagueid))

            print(teamstats)

            self.teamstatsdao.insertTeamStats(teamstats)

            time.sleep(self.iddletime)