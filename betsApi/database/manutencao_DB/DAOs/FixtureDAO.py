from FixtureClosing.Fixture import Fixture as FixtureClosing
from Models.Fixture import Fixture as FixtureDB

class FixtureDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def selectFixturesNext2Hours(self) -> [FixtureClosing]:

        query = "Select * from fixture where state = 'Not Started' and now() < begintime and TIMESTAMPDIFF(HOUR, now(), begintime) < 2"

        cursor = self.dbconnection.select(query)

        fixtures = []
        for (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, oddAway, oddDraw, scoreHome,
             scoreAway) in cursor:
            fixtures.append(FixtureClosing(idfixture, begintime)) # acrescentar tempo

        return fixtures

    def insertFixtures(self, fixtures: [FixtureDB]):

        for fixture in fixtures:

            insert = "INSERT INTO fixture (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, " \
                     "oddAway, oddDraw, scoreHome, scoreAway) VALUES ( %(idfixture)s, %(begintime)s, %(homeTeam)s, " \
                     "%(awayTeam)s, %(idleague)s, %(state)s, %(oddHome)s, %(oddAway)s, %(oddDraw)s, %(scoreHome)s, " \
                     "%(scoreAway)s) "

            dados = {
                'idfixture' : fixture.idfixture,
                'begintime' : fixture.begintime,
                'homeTeam' : fixture.homeTeam,
                'awayTeam' : fixture.awayTeam,
                'idleague' : fixture.idleague,
                'state' : fixture.state,
                'oddHome' : fixture.oddHome,
                'oddAway' : fixture.oddAway,
                'oddDraw' : fixture.oddDraw,
                'scoreHome' : '0',
                'scoreAway' : '0'
            }

            self.dbconnection.insert(insert, dados)
