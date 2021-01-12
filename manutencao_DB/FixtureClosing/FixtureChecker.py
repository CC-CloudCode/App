import threading
import time

class FixtureChecker(threading.Thread):
    def __init__(self, fixtures):
        super().__init__()
        self.sleeptime = 1 * 30 # min
        self.alive = True
        self.fixtures = fixtures

    def run(self):
        while self.alive:

            self.fixtures.notifyAll()

            time.sleep(self.sleeptime)

