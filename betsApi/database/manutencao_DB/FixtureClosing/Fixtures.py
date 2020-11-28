import threading
from FixtureClosing.Fixture import Fixture
import traceback
import sys

class Fixtures(object):
    def __init__(self):
        self.lock = threading.RLock()
        self.fixturesDict = {}

    def add(self, idfixture, endtime):

        fixture = None

        self.lock.acquire()

        if self.fixturesDict.get(idfixture) is None:
            fixture = Fixture(idfixture, endtime)
            self.fixturesDict[idfixture] = fixture

        self.lock.release()

        return fixture

    def remove(self, idfixture):

        self.lock.acquire()

        self.fixturesDict.pop(idfixture)

        self.lock.release()

    def removeAll(self):

        self.lock.acquire()

        self.fixturesDict.clear()

        self.lock.release()

    def notifyAll(self):

        self.lock.acquire()

        try:
            for fixturekey in self.fixturesDict:
                self.fixturesDict[fixturekey].notify()
        except:
            traceback.print_exception(*sys.exc_info())
        finally:
            self.lock.release()

    def lock(self):
        self.lock.acquire()

    def unlock(self):
        self.lock.release()

    def printAll(self):

        self.lock.acquire()

        for fixturekey in self.fixturesDict:
            print(fixturekey)

        self.lock.release()