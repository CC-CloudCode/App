import threading
from datetime import datetime

class FixtureCloser(threading.Thread):
    def __init__(self, fixture, fixtures):
        super().__init__()
        self.fixture = fixture
        self.fixtures = fixtures

    def run(self):

        self.fixture.endFixture()

        print("O jogo com o id " + str(self.fixture.endtime) + " acabou")
        print(datetime.now())

        self.fixtures.remove(self.fixture.idfixture)