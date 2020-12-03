import threading
from APICommunication.APICommunication import APICommunication
from datetime import date, timedelta
from DAOs.FixtureDAO import FixtureDAO
from DAOs.H2HDAO import H2HDAO
import time
from DAOs.LeagueDAO import LeagueDAO

class FixtureUpdater(threading.Thread):
    def __init__(self, api: APICommunication, fixturesdao: FixtureDAO, h2hdao: H2HDAO, leaguedao: LeagueDAO):
        super().__init__()
                        # h * min * s
        self.iddletime = 24 * 60 * 60
        self.api = api
        self.alive = True
        self.fixturesdao = fixturesdao
        self.h2hdao = h2hdao
        self.leaguedao = leaguedao
        self.daysahead = 3

    def run(self):
        while self.alive:

            leagueids = self.leaguedao.selectAllLeagueIds()

            data = date.today() + timedelta(days=self.daysahead)

            fixtures = self.api.getFixturesForDate(data, leagueids)

            self.api.getOddsByDate(data, fixtures)

            # paralelizar aqui também
            # h2hs = self.api.getH2HForFixtures(fixtures)

            self.fixturesdao.insertFixtures(fixtures)

            # self.h2hdao.insertH2Hs(h2hs)

            time.sleep(self.iddletime)
