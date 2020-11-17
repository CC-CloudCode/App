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




# STATS
# https://rapidapi.p.rapidapi.com/v2/leagues/country/england/2020
with open('stats_liver.json') as f:
  data = json.load(f)

idstat = 1
stat = data['api']['statistics']

goalsForTotal = stat['goals']['goalsFor']['total']
goalsAgainstTotal = stat['goals']['goalsAgainst']['total']

fp.write("INSERT INTO team_stats (idteam_stats, idleague, team_idteam, "
                            "matchsPlayedHome, matchsPlayedAway, winsHome,"
                            "winsAway, drawsHome, drawsAway, "
                            "losesHome, losesAway, goalsForHome,"
                            "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                            "matchsPlayedTotal, winsTotal, drawsTotal, "
                            "losesTotal, goalsForTotal, goalsAgainstTotal, "
                            "avgGoalsForHome, avgGoalsForAway, avgGoalsAgainstHome,"
                            "avgGoalsAgainstAway, avgGoalsForTotal, avgGoalsAgainstTotal,"
                            "goalsDiff) "
         "VALUES ("+str(idstat)+", 2790, 40,"
                    +str(stat['matchs']['matchsPlayed']['home'])+","+str(stat['matchs']['matchsPlayed']['away'])+","+str(stat['matchs']['wins']['home'])+","
                    +str(stat['matchs']['wins']['away'])+","+str(stat['matchs']['draws']['home'])+","+str(stat['matchs']['draws']['away'])+","
                    +str(stat['matchs']['loses']['home'])+","+str(stat['matchs']['loses']['away'])+","+str(stat['goals']['goalsFor']['home'])+","
                    +str(stat['goals']['goalsFor']['away'])+","+str(stat['goals']['goalsAgainst']['home'])+","+str(stat['goals']['goalsAgainst']['away'])+","
                    +str(stat['matchs']['matchsPlayed']['total'])+","+str(stat['matchs']['wins']['total'])+","+str(stat['matchs']['draws']['total'])+","
                    +str(stat['matchs']['loses']['total'])+","+str(goalsForTotal)+","+str(goalsAgainstTotal)+","
                    +stat['goalsAvg']['goalsFor']['home']+","+stat['goalsAvg']['goalsFor']['away']+","+stat['goalsAvg']['goalsAgainst']['home']+","
                    +stat['goalsAvg']['goalsAgainst']['away']+","+stat['goalsAvg']['goalsFor']['total']+","+stat['goalsAvg']['goalsAgainst']['total']+","
                    +str(goalsForTotal - goalsAgainstTotal)+");\n")

idstat += 1

with open('stats_united.json') as f:
  data = json.load(f)

stat = data['api']['statistics']

goalsForTotal = stat['goals']['goalsFor']['total']
goalsAgainstTotal = stat['goals']['goalsAgainst']['total']

fp.write("INSERT INTO team_stats (idteam_stats, idleague, team_idteam, "
                            "matchsPlayedHome, matchsPlayedAway, winsHome,"
                            "winsAway, drawsHome, drawsAway, "
                            "losesHome, losesAway, goalsForHome,"
                            "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                            "matchsPlayedTotal, winsTotal, drawsTotal, "
                            "losesTotal, goalsForTotal, goalsAgainstTotal, "
                            "avgGoalsForHome, avgGoalsForAway, avgGoalsAgainstHome,"
                            "avgGoalsAgainstAway, avgGoalsForTotal, avgGoalsAgainstTotal,"
                            "goalsDiff) "
         "VALUES ("+str(idstat)+", 2790, 33,"
                    +str(stat['matchs']['matchsPlayed']['home'])+","+str(stat['matchs']['matchsPlayed']['away'])+","+str(stat['matchs']['wins']['home'])+","
                    +str(stat['matchs']['wins']['away'])+","+str(stat['matchs']['draws']['home'])+","+str(stat['matchs']['draws']['away'])+","
                    +str(stat['matchs']['loses']['home'])+","+str(stat['matchs']['loses']['away'])+","+str(stat['goals']['goalsFor']['home'])+","
                    +str(stat['goals']['goalsFor']['away'])+","+str(stat['goals']['goalsAgainst']['home'])+","+str(stat['goals']['goalsAgainst']['away'])+","
                    +str(stat['matchs']['matchsPlayed']['total'])+","+str(stat['matchs']['wins']['total'])+","+str(stat['matchs']['draws']['total'])+","
                    +str(stat['matchs']['loses']['total'])+","+str(goalsForTotal)+","+str(goalsAgainstTotal)+","
                    +stat['goalsAvg']['goalsFor']['home']+","+stat['goalsAvg']['goalsFor']['away']+","+stat['goalsAvg']['goalsAgainst']['home']+","
                    +stat['goalsAvg']['goalsAgainst']['away']+","+stat['goalsAvg']['goalsFor']['total']+","+stat['goalsAvg']['goalsAgainst']['total']+","
                    +str(goalsForTotal - goalsAgainstTotal)+");\n")


idstat += 1

with open('stats_westbrom.json') as f:
  data = json.load(f)

stat = data['api']['statistics']

goalsForTotal = stat['goals']['goalsFor']['total']
goalsAgainstTotal = stat['goals']['goalsAgainst']['total']

fp.write("INSERT INTO team_stats (idteam_stats, idleague, team_idteam, "
                            "matchsPlayedHome, matchsPlayedAway, winsHome,"
                            "winsAway, drawsHome, drawsAway, "
                            "losesHome, losesAway, goalsForHome,"
                            "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                            "matchsPlayedTotal, winsTotal, drawsTotal, "
                            "losesTotal, goalsForTotal, goalsAgainstTotal, "
                            "avgGoalsForHome, avgGoalsForAway, avgGoalsAgainstHome,"
                            "avgGoalsAgainstAway, avgGoalsForTotal, avgGoalsAgainstTotal,"
                            "goalsDiff) "
         "VALUES ("+str(idstat)+", 2790, 60,"
                    +str(stat['matchs']['matchsPlayed']['home'])+","+str(stat['matchs']['matchsPlayed']['away'])+","+str(stat['matchs']['wins']['home'])+","
                    +str(stat['matchs']['wins']['away'])+","+str(stat['matchs']['draws']['home'])+","+str(stat['matchs']['draws']['away'])+","
                    +str(stat['matchs']['loses']['home'])+","+str(stat['matchs']['loses']['away'])+","+str(stat['goals']['goalsFor']['home'])+","
                    +str(stat['goals']['goalsFor']['away'])+","+str(stat['goals']['goalsAgainst']['home'])+","+str(stat['goals']['goalsAgainst']['away'])+","
                    +str(stat['matchs']['matchsPlayed']['total'])+","+str(stat['matchs']['wins']['total'])+","+str(stat['matchs']['draws']['total'])+","
                    +str(stat['matchs']['loses']['total'])+","+str(goalsForTotal)+","+str(goalsAgainstTotal)+","
                    +stat['goalsAvg']['goalsFor']['home']+","+stat['goalsAvg']['goalsFor']['away']+","+stat['goalsAvg']['goalsAgainst']['home']+","
                    +stat['goalsAvg']['goalsAgainst']['away']+","+stat['goalsAvg']['goalsFor']['total']+","+stat['goalsAvg']['goalsAgainst']['total']+","
                    +str(goalsForTotal - goalsAgainstTotal)+");\n")


idstat += 1

with open('stats_southampton.json') as f:
  data = json.load(f)

stat = data['api']['statistics']

goalsForTotal = stat['goals']['goalsFor']['total']
goalsAgainstTotal = stat['goals']['goalsAgainst']['total']

fp.write("INSERT INTO team_stats (idteam_stats, idleague, team_idteam, "
                            "matchsPlayedHome, matchsPlayedAway, winsHome,"
                            "winsAway, drawsHome, drawsAway, "
                            "losesHome, losesAway, goalsForHome,"
                            "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                            "matchsPlayedTotal, winsTotal, drawsTotal, "
                            "losesTotal, goalsForTotal, goalsAgainstTotal, "
                            "avgGoalsForHome, avgGoalsForAway, avgGoalsAgainstHome,"
                            "avgGoalsAgainstAway, avgGoalsForTotal, avgGoalsAgainstTotal,"
                            "goalsDiff) "
         "VALUES ("+str(idstat)+", 2790, 41,"
                    +str(stat['matchs']['matchsPlayed']['home'])+","+str(stat['matchs']['matchsPlayed']['away'])+","+str(stat['matchs']['wins']['home'])+","
                    +str(stat['matchs']['wins']['away'])+","+str(stat['matchs']['draws']['home'])+","+str(stat['matchs']['draws']['away'])+","
                    +str(stat['matchs']['loses']['home'])+","+str(stat['matchs']['loses']['away'])+","+str(stat['goals']['goalsFor']['home'])+","
                    +str(stat['goals']['goalsFor']['away'])+","+str(stat['goals']['goalsAgainst']['home'])+","+str(stat['goals']['goalsAgainst']['away'])+","
                    +str(stat['matchs']['matchsPlayed']['total'])+","+str(stat['matchs']['wins']['total'])+","+str(stat['matchs']['draws']['total'])+","
                    +str(stat['matchs']['loses']['total'])+","+str(goalsForTotal)+","+str(goalsAgainstTotal)+","
                    +stat['goalsAvg']['goalsFor']['home']+","+stat['goalsAvg']['goalsFor']['away']+","+stat['goalsAvg']['goalsAgainst']['home']+","
                    +stat['goalsAvg']['goalsAgainst']['away']+","+stat['goalsAvg']['goalsFor']['total']+","+stat['goalsAvg']['goalsAgainst']['total']+","
                    +str(goalsForTotal - goalsAgainstTotal)+");\n")


idstat += 1

with open('stats_westham.json') as f:
  data = json.load(f)

stat = data['api']['statistics']

goalsForTotal = stat['goals']['goalsFor']['total']
goalsAgainstTotal = stat['goals']['goalsAgainst']['total']

fp.write("INSERT INTO team_stats (idteam_stats, idleague, team_idteam, "
                            "matchsPlayedHome, matchsPlayedAway, winsHome,"
                            "winsAway, drawsHome, drawsAway, "
                            "losesHome, losesAway, goalsForHome,"
                            "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                            "matchsPlayedTotal, winsTotal, drawsTotal, "
                            "losesTotal, goalsForTotal, goalsAgainstTotal, "
                            "avgGoalsForHome, avgGoalsForAway, avgGoalsAgainstHome,"
                            "avgGoalsAgainstAway, avgGoalsForTotal, avgGoalsAgainstTotal,"
                            "goalsDiff) "
         "VALUES ("+str(idstat)+", 2790, 48,"
                    +str(stat['matchs']['matchsPlayed']['home'])+","+str(stat['matchs']['matchsPlayed']['away'])+","+str(stat['matchs']['wins']['home'])+","
                    +str(stat['matchs']['wins']['away'])+","+str(stat['matchs']['draws']['home'])+","+str(stat['matchs']['draws']['away'])+","
                    +str(stat['matchs']['loses']['home'])+","+str(stat['matchs']['loses']['away'])+","+str(stat['goals']['goalsFor']['home'])+","
                    +str(stat['goals']['goalsFor']['away'])+","+str(stat['goals']['goalsAgainst']['home'])+","+str(stat['goals']['goalsAgainst']['away'])+","
                    +str(stat['matchs']['matchsPlayed']['total'])+","+str(stat['matchs']['wins']['total'])+","+str(stat['matchs']['draws']['total'])+","
                    +str(stat['matchs']['loses']['total'])+","+str(goalsForTotal)+","+str(goalsAgainstTotal)+","
                    +stat['goalsAvg']['goalsFor']['home']+","+stat['goalsAvg']['goalsFor']['away']+","+stat['goalsAvg']['goalsAgainst']['home']+","
                    +stat['goalsAvg']['goalsAgainst']['away']+","+stat['goalsAvg']['goalsFor']['total']+","+stat['goalsAvg']['goalsAgainst']['total']+","
                    +str(goalsForTotal - goalsAgainstTotal)+");\n")

fp.write("\n\n")




# STANDINGS
# https://api-football-v1.p.rapidapi.com/v2/leagueTable/{league_id}
with open('standings_premier.json') as f:
  data = json.load(f)

idstanding = 1
for standing in data['api']['standings']:
    for stan in standing:
        fp.write("INSERT INTO standing (idstanding, position, idleague, idteam, standing.group, points) "
                "VALUES ("+str(idstanding)+", "+str(stan['rank'])+", 2790, "+str(stan['team_id'])+", \""+stan['group']+"\", "+str(stan['points'])+");\n")
        idstanding += 1


fp.close()

fp = open("povoamento1.sql", "r")
print(fp.read())
