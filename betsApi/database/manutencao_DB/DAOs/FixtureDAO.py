from FixtureClosing.Fixture import Fixture as FixtureClosing
from Models.Fixture import Fixture as FixtureDB

class FixtureDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def selectFixturesNext2Hours(self):

        self.dbconnection.connect()

        query = "Select * from fixture where state = 'Not Started' and now() < begintime and TIMESTAMPDIFF(HOUR, now(), begintime) < 2"

        cursor = self.dbconnection.con.cursor(buffered=True)

        cursor.execute(query)

        fixtures = []
        for (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, oddAway, oddDraw, scoreHome,
             scoreAway) in cursor:
            fixtures.append(FixtureClosing(idfixture, begintime)) # acrescentar tempo

        return fixtures

    def insertFixtures(self, fixtures):

        self.dbconnection.connect()

        for fixture in fixtures:

            insert = "INSERT INTO fixture (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, " \
                     "oddAway, oddDraw, scoreHome, scoreAway) VALUES ( %(idfixture)s, %(begintime)s, %(homeTeam)s, " \
                     "%(awayTeam)s, %(idleague)s, %(state)s, %(oddHome)s, %(oddAway)s, %(oddDraw)s, %(scoreHome)s, " \
                     "%(scoreAway)) "

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
                'scoreHome' : fixture.scoreHome,
                'scoreAway' : fixture.scoreAway
            }

            cursor = self.dbconnection.con.cursor(buffered=True)

            cursor.execute(insert, dados)
            self.dbconnection.con.commit()
            cursor.close()