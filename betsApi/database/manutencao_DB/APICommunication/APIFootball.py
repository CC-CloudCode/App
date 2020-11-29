from APICommunication.APICommunication import APICommunication
import requests
from Models.Fixture import Fixture
from Models.Team_Stats import Team_Stats
from Models.H2H import H2H

class APIFootball(APICommunication):
    def __init__(self, apikey, host):
        self.apikey = apikey
        self.host = host
        self.headers = {
                'x-rapidapi-key': self.apikey,
                'x-rapidapi-host': self.host
        }

    def getFixturesForDate(self, data, leagueids):

        fixtures = []

        url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/date/" + data

        response = requests.request("GET", url, headers=self.headers)

        fixs = response.json()

        for fix in fixs['api']['fixtures']:
            leagueid = fix['league_id']

            if leagueid in leagueids:
                head, sep, tail = str(fix['event_date']).partition('+')

                fixtures.append(
                    Fixture(fix['fix_id'], head, fix['homeTeam']['team_id'], fix['awayTeam']['team_id'], leagueid,
                            fix['status'], 0, 0, 0, 0, 0))

        return fixtures


    def getH2HForFixtures(self, fixtures):

        heads2heads = []

        for fixture in fixtures:

            url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/" + str(fixture.homeTeam) + "/" + str(fixture.awayTeam)

            response = requests.request("GET", url, headers=self.headers)

            h2hs = response.json()

            for h2h in h2hs['api']['fixtures']:
                head, sep, tail = str(h2h['event_date']).partition('+')

                heads2heads.append(H2H(0, fixture.idfixture, h2h['homeTeam']['team_id'], h2h['awayTeam']['team_id'], h2h['score']['fulltime'], head))

        return heads2heads


    def getTeamStats(self, leagueid: int):

        stats = []

        url = "https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + str(leagueid)

        response = requests.request("GET", url, headers=self.headers)

        teams = response.json()

        for standing in teams['api']['standings']:
            for stat in standing:
                stats.append(Team_Stats(0, stat['team_id'], stat['home']['matchsPlayed'], stat['away']['matchsPlayed'],
                                        stat['home']['win'], stat['away']['win'], stat['home']['draw'], stat['away']['draw'],
                                        stat['home']['lose'], stat['away']['lose'], stat['home']['goalsFor'],
                                        stat['away']['goalsFor'], stat['home']['goalsAgainst'], stat['away']['goalsAgainst'],
                                        stat['all']['matchsPlayed'], stat['all']['win'], stat['all']['draw'], stat['all']['lose'],
                                        stat['all']['goalsFor'], stat['all']['goalsAgainst'], stat['goalsDiff'], stat['rank'],
                                        stat['group'], stat['points'], stat['forme']))


        return stats
