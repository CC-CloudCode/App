import json

fp = open("povoamento1.sql", "w")

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
idh2h = 1
for fixture in data['api']['fixtures']:
    head, sep, tail = str(fixture['event_date']).partition('+')
    fp.write("INSERT INTO fixture (idfixture, begintime, hometeam,awayteam, idleague, state, oddhome, oddaway, odddraw, scoreHome, scoreAway) "
             "VALUES ("+str(fixture['fixture_id'])+","
                 "\""+head+"\", "+str(fixture['homeTeam']['team_id'])+", "
                 +str(fixture['awayTeam']['team_id'])+","+str(fixture['league_id'])+", \""+fixture['status']+"\", 0,0,0, 0, 0);\n")

    away = fixture['awayTeam']['team_id']
    home = fixture['homeTeam']['team_id']
    if (away == 33 and home == 40) or (away == 40 and home == 33):

        # H2H
        with open('h2h_liver_united.json') as f:
            data1 = json.load(f)

        for h2h in data1['api']['fixtures']:
            head, sep, tail = str(h2h['event_date']).partition('+')
            if h2h['league']['name'] == 'Premier League':  # caso especial como so temos a premier league
                fp.write("\t\tINSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                         "VALUES (" + str(idh2h) + "," + str(fixture['fixture_id']) + "," + str(
                    h2h['homeTeam']['team_id']) + ", "
                         + str(h2h['awayTeam']['team_id']) + ",\"" + str(
                    h2h['score']['fulltime']) + "\", \"" + head + "\");\n")
            idh2h += 1

    if (away == 33 and home == 60) or (away == 60 and home == 33):

        # H2H
        with open('h2h_united_westbrom.json') as f:
            data1 = json.load(f)

        for h2h in data1['api']['fixtures']:
            head, sep, tail = str(h2h['event_date']).partition('+')
            if h2h['league']['name'] == 'Premier League':  # caso especial como so temos a premier league
                fp.write("\t\tINSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                         "VALUES (" + str(idh2h) + "," + str(fixture['fixture_id']) + "," + str(
                    h2h['homeTeam']['team_id']) + ", "
                         + str(h2h['awayTeam']['team_id']) + ",\"" + str(
                    h2h['score']['fulltime']) + "\", \"" + head + "\");\n")
            idh2h += 1

    if (away == 33 and home == 41) or (away == 41 and home == 33):

        # H2H
        with open('h2h_united_southampton.json') as f:
            data1 = json.load(f)

        for h2h in data1['api']['fixtures']:
            head, sep, tail = str(h2h['event_date']).partition('+')
            if h2h['league']['name'] == 'Premier League':  # caso especial como so temos a premier league
                fp.write("\t\tINSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                         "VALUES (" + str(idh2h) + "," + str(fixture['fixture_id']) + "," + str(
                    h2h['homeTeam']['team_id']) + ", "
                         + str(h2h['awayTeam']['team_id']) + ",\"" + str(
                    h2h['score']['fulltime']) + "\", \"" + head + "\");\n")
            idh2h += 1

    if (away == 33 and home == 48) or (away == 48 and home == 33):

        # H2H
        with open('h2h_united_westham.json') as f:
            data1 = json.load(f)

        for h2h in data1['api']['fixtures']:
            head, sep, tail = str(h2h['event_date']).partition('+')
            if h2h['league']['name'] == 'Premier League':  # caso especial como so temos a premier league
                fp.write("\t\tINSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                         "VALUES (" + str(idh2h) + "," + str(fixture['fixture_id']) + "," + str(
                    h2h['homeTeam']['team_id']) + ", "
                         + str(h2h['awayTeam']['team_id']) + ",\"" + str(
                    h2h['score']['fulltime']) + "\", \"" + head + "\");\n")
            idh2h += 1

    idfixture += 1



fp.write("\n\n")



# STANDINGS
# https://api-football-v1.p.rapidapi.com/v2/leagueTable/{league_id}
with open('standings_premier.json') as f:
  data = json.load(f)

idstat = 1
for standing in data['api']['standings']:
    for stat in standing:
        goalsForTotal = stat['all']['goalsFor']
        goalsAgainstTotal = stat['all']['goalsAgainst']

        fp.write("INSERT INTO team_stats (idteam_stats, idleague, idteam, "
                 "matchsPlayedHome, matchsPlayedAway, winsHome,"
                 "winsAway, drawsHome, drawsAway, "
                 "losesHome, losesAway, goalsForHome,"
                 "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                 "matchsPlayedTotal, winsTotal, drawsTotal, "
                 "losesTotal, goalsForTotal, goalsAgainstTotal, "
                 "goalsDiff, position, team_stats.group, points) "
                 "VALUES (" + str(idstat) + ", 2790, "+str(stat['team_id'])+","
                 + str(stat['home']['matchsPlayed']) + "," + str(
            stat['away']['matchsPlayed']) + "," + str(stat['home']['win']) + ","
                 + str(stat['away']['win']) + "," + str(stat['home']['draw']) + "," + str(
            stat['away']['draw']) + ","
                 + str(stat['home']['lose']) + "," + str(stat['away']['lose']) + "," + str(
            stat['home']['goalsFor']) + ","
                 + str(stat['away']['goalsFor']) + "," + str(
            stat['home']['goalsAgainst']) + "," + str(stat['away']['goalsAgainst']) + ","
                 + str(stat['all']['matchsPlayed']) + "," + str(
            stat['all']['win']) + "," + str(stat['all']['draw']) + ","
                 + str(stat['all']['lose']) + "," + str(goalsForTotal) + "," + str(goalsAgainstTotal) + ","
                 + str(goalsForTotal - goalsAgainstTotal) + "," + str(stat['rank']) + ",\"" + stat[
                     'group'] + "\", " + str(stat['points']) + ");\n")
        idstat += 1



fp.close()

fp = open("povoamento1.sql", "r")
print(fp.read())
