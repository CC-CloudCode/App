import threading
from FixtureClosing.FixtureCloser import FixtureCloser
import time


class DBFixturesGetter(threading.Thread):
    def __init__(self, fixtures, fixturedao):
        super().__init__()
        self.fixtures = fixtures
        self.iddletime = 20 * 60 # min
        self.alive = True
        self.fixturedao = fixturedao

    def run(self):
        while self.alive:

            fixturesdb = self.fixturedao.selectFixturesNext2Hours()

            for fix in fixturesdb:
                fixture = self.fixtures.add(fix.idfixture, fix.endtime)
                if fixture is not None:
                    FixtureCloser(fixture, self.fixtures).start()


            time.sleep(self.iddletime)
