import abc

class APICommunication(metaclass=abc.ABCMeta):
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, '__init__') and
                callable(subclass.__init__) or
                NotImplemented)

    @abc.abstractmethod
    def __init__(self, apikey, host):
        raise NotImplementedError

    @abc.abstractmethod
    def getFixturesForDate(self, data, leagueids):
        raise NotImplementedError

    @abc.abstractmethod
    def getH2HForFixtures(self, fixtures):
        raise NotImplementedError

    @abc.abstractmethod
    def getTeamStats(self, leagueid: int):
        raise NotImplementedError