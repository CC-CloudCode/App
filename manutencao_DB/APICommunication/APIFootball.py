from APICommunication.APICommunication import APICommunication
import requests
from Models.Fixture import Fixture
from Models.Team_Stats import Team_Stats
from Models.H2H import H2H
import time

class APIFootball(APICommunication):
    def __init__(self, apikey, host):
        self.apikey = apikey
        self.host = host
        self.headers = {
                'x-rapidapi-key': self.apikey,
                'x-rapidapi-host': self.host
        }

    def getScore(self, idfixture):

        time.sleep(10)

        url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/id/" + str(idfixture)

        response = requests.request("GET", url, headers=self.headers)

        fixes = response.json()

        statusEscore = {'status': None, 'score': None}

        for fix in fixes['api']['fixtures']:

            statusEscore['status'] = fix['status']

            statusEscore['score'] = fix['score']['fulltime']

        return statusEscore






    def getFixturesForDate(self, data, leagueids):

        time.sleep(10)

        fixtures = []

        url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/date/" + data.strftime("%Y-%m-%d")


        response = requests.request("GET", url, headers=self.headers)

        fixs = response.json()


        for fix in fixs['api']['fixtures']:
            leagueid = fix['league_id']

            if leagueid in leagueids:
                head, sep, tail = str(fix['event_date']).partition('+')
                print("encontrei um jogo")
                fixtures.append(
                    Fixture(fix['fixture_id'], head, fix['homeTeam']['team_id'], fix['awayTeam']['team_id'], leagueid,
                            fix['status'], 0, 0, 0, 0, 0))

        return fixtures


    def getH2HForFixtures(self, fixtures):

        heads2heads = []


        for fixture in fixtures:

            print("h2h de uma fixture")
            print(fixture)

            time.sleep(10)

            url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/" + str(fixture.homeTeam) + "/" + str(fixture.awayTeam)

            response = requests.request("GET", url, headers=self.headers)

            h2hs = response.json()

            print(h2hs)

            for h2h in h2hs['api']['fixtures']:

                head, sep, tail = str(h2h['event_date']).partition('+')

                heads2heads.append(H2H(0, fixture.idfixture, h2h['homeTeam']['team_id'], h2h['awayTeam']['team_id'], h2h['score']['fulltime'], head))

        return heads2heads


    def getTeamStats(self, leagueid: int):

        time.sleep(10)

        stats = []

        url = "https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + str(leagueid)

        response = requests.request("GET", url, headers=self.headers)

        teams = response.json()


        for standing in teams['api']['standings']:
            for stat in standing:
                stats.append(Team_Stats(0, leagueid, stat['team_id'], stat['home']['matchsPlayed'], stat['away']['matchsPlayed'],
                                        stat['home']['win'], stat['away']['win'], stat['home']['draw'], stat['away']['draw'],
                                        stat['home']['lose'], stat['away']['lose'], stat['home']['goalsFor'],
                                        stat['away']['goalsFor'], stat['home']['goalsAgainst'], stat['away']['goalsAgainst'],
                                        stat['all']['matchsPlayed'], stat['all']['win'], stat['all']['draw'], stat['all']['lose'],
                                        stat['all']['goalsFor'], stat['all']['goalsAgainst'], stat['goalsDiff'], stat['rank'],
                                        stat['group'], stat['points'], stat['forme']))


        return stats

    def getOddsByDate(self, data, fixtures):

        print("entrei no odds")

        for fixture in fixtures:

            time.sleep(10)

            url = "https://api-football-v1.p.rapidapi.com/v2/odds/fixture/" + str(fixture.idfixture)

            response = requests.request("GET", url, headers=self.headers)

            odds = response.json()

            print(odds)

            try:
                for odd in odds['api']['odds']:
                    print('oddssssssss')
                    for bookmaker in odd['bookmakers']:
                        if bookmaker['bookmaker_id'] == 6:
                            for bet in bookmaker['bets']:
                                if bet['label_id'] == 1:

                                    fixture.oddAway = bet['values'][2]['odd']
                                    fixture.oddDraw = bet['values'][1]['odd']
                                    fixture.oddHome = bet['values'][0]['odd']

                                    print('oddaway = ' + bet['values'][2]['odd'])
                                    print('odddraw = ' + bet['values'][1]['odd'])
                                    print('oddhome = ' + bet['values'][0]['odd'])

                                    break
                            break

            except:
                fixture.oddAway = 2
                fixture.oddDraw = 2
                fixture.oddHome = 2

                print('odd: ' + str(fixture.oddAway))
                print('odd: ' + str(fixture.oddDraw))
                print('odd: ' + str(fixture.oddHome))

        print("acabei de ir buscar as odds")





                






