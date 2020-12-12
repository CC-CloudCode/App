from FixtureClosing.Fixture import Fixture as FixtureClosing
from Models.Fixture import Fixture as FixtureDB
from datetime import date, timedelta

class FixtureDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection
        self.minutesahead = 110

    def updateStateEScore(self, idfixture, state, score):
        update = "update fixture set state = %(state)s, scoreHome = %(scoreHome)s, scoreAway = %(scoreAway)s  where idfixture = %(idfixture)s"

        head, sep, tail = str(score).partition('-')

        dados = {
            'state': state,
            'idfixture': idfixture,
            'scoreHome': head,
            'scoreAway': tail
        }

        self.dbconnection.update(update, dados)

    def selectFixturesNext2Hours(self) -> [FixtureClosing]:
                                             # state = 'Not Started' and
        query = "Select * from fixture where  now() < begintime and TIMESTAMPDIFF(HOUR, now(), begintime) < 2"

        cursor = self.dbconnection.select(query)

        fixtures = []
        for (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, oddAway, oddDraw, scoreHome,
             scoreAway) in cursor:
            fixtures.append(FixtureClosing(idfixture, begintime + timedelta(minutes=self.minutesahead), None, None, None))

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
