import json

fp = open("povoamento.sql", "w")

# TEAMS
# https://rapidapi.p.rapidapi.com/v2/leagues/country/england/2020
with open('premier.json') as f:
  data = json.load(f)

idteam = 1
for team in data['api']['teams']:
    fp.write("INSERT INTO team (idteam, name, logo) VALUES ("+str(team['team_id'])+", \""+str(team['name'])+"\", \""+team['logo']+"\");\n")
    idteam += 1

fp.write("\n\n")

# LEAGUES
# https://rapidapi.p.rapidapi.com/v2/teams/league/2790
with open('ligasInglaterra.json') as f:
  data = json.load(f)

idleague = 1
for league in data['api']['leagues']:
    fp.write("INSERT INTO league (idleague, name, logo, idcountry) VALUES ("+str(league['league_id'])+", \""+league['name']+"\", \""+league['logo']+"\", 'EN');\n")
    idleague += 1

fp.write("\n\n")

# FIXTURES
with open('fixturesManchesterPremier.json') as f:
  data = json.load(f)

idfixture = 1
for fixture in data['api']['fixtures']:
    fp.write("INSERT INTO fixture (idfixture, begintime, hometeam,awayteam, idleague, state, oddhome, oddaway, odddraw, scoreHome, scoreAway) "
             "VALUES ("+str(fixture['fixture_id'])+","
                 "\""+fixture['event_date']+"\", "+str(fixture['homeTeam']['team_id'])+", "
                 +str(fixture['awayTeam']['team_id'])+","+str(fixture['league_id'])+", \""+fixture['status']+"\", 0,0,0, 0, 0);\n")
    idfixture += 1

fp.write("\n\n")

# H2H
with open('h2h_city_liver.json') as f:
  data = json.load(f)

idh2h = 1
for h2h in data['api']['fixtures']:
    if h2h['league']['name'] == 'Premier League':
        fp.write("INSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                 "VALUES ("+str(idh2h)+","+str(h2h['fixture_id'])+","+str(h2h['homeTeam']['team_id'])+", "
                     +str(h2h['awayTeam']['team_id'])+",\""+str(h2h['score']['fulltime'])+"\", \""+h2h['event_date']+"\");\n")
    idh2h += 1


fp.close()

fp = open("povoamento.sql", "r")
print(fp.read())
