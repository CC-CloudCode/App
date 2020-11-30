from FixtureClosing.DBFixturesGetter import DBFixturesGetter
from FixtureClosing.Fixtures import Fixtures
from FixtureClosing.FixtureChecker import FixtureChecker
from DBconnection.MYSQLconnection import MYSQLconnection
from DAOs.FixtureDAO import FixtureDAO
from APICommunication.APIFootball import APIFootball
from FixtureUpdater.FixtureUpdater import FixtureUpdater
from DAOs.H2HDAO import H2HDAO
from DAOs.LeagueDAO import LeagueDAO
from DAOs.Team_StatsDAO import Team_StatsDAO
from Team_Stats_Updater.Team_Stats_Updater import Team_Stats_Updater

if __name__ == '__main__':


    dbconnection = MYSQLconnection('bettingspree', 'PEI2020', '127.0.0.1', 'betsbettingspree')


    fixturesdao = FixtureDAO(dbconnection)
    h2hdao = H2HDAO(dbconnection)
    leaguedao = LeagueDAO(dbconnection)
    teamstatsdao = Team_StatsDAO(dbconnection)

    fixtures = Fixtures()
    getfixtures = DBFixturesGetter(fixtures, fixturesdao)
    getfixtures.start()

    checkfixtures = FixtureChecker(fixtures)
    checkfixtures.start()

    apiconnection = APIFootball("175d25ef14msh2b92516c1a16889p15c3e0jsndeb352ecab3a", "api-football-v1.p.rapidapi.com")

    fixtureupdater = FixtureUpdater(apiconnection, fixturesdao, h2hdao, leaguedao)
    fixtureupdater.start()

    teamstatsupdater = Team_Stats_Updater(apiconnection, teamstatsdao, leaguedao)
    teamstatsupdater.start()

    """
    print(time.mktime(time.strptime("2016-12-02T20:30:00", '%Y-%m-%dT%H:%M:%S')))

    agora = datetime.datetime.now()
    print(datetime.datetime.now())

    futuro = datetime.datetime.strptime("2020-12-02T20:30:00" ,'%Y-%m-%dT%H:%M:%S')
    print(datetime.datetime.strptime("2020-12-02T20:30:00" ,'%Y-%m-%dT%H:%M:%S'))

    print(futuro <= agora)
    """