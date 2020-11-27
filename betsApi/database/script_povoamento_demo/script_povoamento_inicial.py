import requests

fp = open("povoamento_dinamico.sql", "w", encoding="utf-8")

fp.write("use betsbettingspree;\n\n")
fp.write("insert into country values ('EN', \"England\", \"https://media.api-sports.io/flags/gb.svg\");\ninsert into country values ('ES', \"Spain\", \"https://media.api-sports.io/flags/es.svg\");\ninsert into country values ('PT', \"Portugal\", \"https://media.api-sports.io/flags/pt.svg\");\n\n")
fp.write("INSERT INTO league (idleague, name, logo, idcountry) VALUES (2790, \"Premier League\", \"https://media.api-sports.io/football/leagues/39.png\", 'EN');\n")
fp.write("INSERT INTO league (idleague, name, logo, idcountry) VALUES (2833, \"Primera Division\", \"https://media.api-sports.io/football/leagues/140.png\", 'ES');\n")
fp.write("INSERT INTO league (idleague, name, logo, idcountry) VALUES (2826, \"Primeira Divisão\", \"https://media.api-sports.io/football/leagues/94.png\", 'PT');\n\n")

leagues = [2826]

idstat = 1


for league in leagues:
    url = "https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + str(league)


    headers = {
        'x-rapidapi-key': "175d25ef14msh2b92516c1a16889p15c3e0jsndeb352ecab3a",
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    teams = response.json()

    print(teams)

    for standing in teams['api']['standings']:
        for stat in standing:
            fp.write("INSERT INTO team (idteam, name, logo) VALUES ("+str(stat['team_id'])+", \""+str(stat['teamName'])+"\", \""+stat['logo']+"\");\n")
            fp.write("\t\t")
            fp.write("INSERT INTO team_stats (idteam_stats, idleague, idteam, "
                     "matchsPlayedHome, matchsPlayedAway, winsHome,"
                     "winsAway, drawsHome, drawsAway, "
                     "losesHome, losesAway, goalsForHome,"
                     "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
                     "matchsPlayedTotal, winsTotal, drawsTotal, "
                     "losesTotal, goalsForTotal, goalsAgainstTotal, "
                     "goalsDiff, position, team_stats.group, points, forme) "
                     "VALUES (" + str(idstat) + ", "+str(league)+", " + str(stat['team_id']) + ","
                     + str(stat['home']['matchsPlayed']) + "," + str(stat['away']['matchsPlayed']) + "," + str(
                stat['home']['win']) + ","
                     + str(stat['away']['win']) + "," + str(stat['home']['draw']) + "," + str(stat['away']['draw']) + ","
                     + str(stat['home']['lose']) + "," + str(stat['away']['lose']) + "," + str(
                stat['home']['goalsFor']) + ","
                     + str(stat['away']['goalsFor']) + "," + str(stat['home']['goalsAgainst']) + "," + str(
                stat['away']['goalsAgainst']) + ","
                     + str(stat['all']['matchsPlayed']) + "," + str(stat['all']['win']) + "," + str(
                stat['all']['draw']) + ","
                     + str(stat['all']['lose']) + "," + str(stat['all']['goalsFor']) + "," + str(
                stat['all']['goalsAgainst']) + ","
                     + str(stat['goalsDiff']) + "," + str(stat['rank']) + ",\"" + stat['group'] + "\", "
                     + str(stat['points']) + ",\"" + stat['forme'] + "\");\n")
            idstat += 1


fp.write("\n")

# fixtures

datas = ["2020-11-27", "2020-11-28", "2020-11-29", "2020-11-30", "2020-12-01", "2020-12-02"]


idh2h = 1

for data in datas:
    url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/date/" + data


    headers = {
        'x-rapidapi-key': "175d25ef14msh2b92516c1a16889p15c3e0jsndeb352ecab3a",
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    fixtures = response.json()

    print(fixtures)

    countfixtures = 0

    for fixture in fixtures['api']['fixtures']:
        if fixture['league_id'] in leagues:

            idfixture = fixture['fixture_id']
            idhometeam = fixture['homeTeam']['team_id']
            idawayteam = fixture['awayTeam']['team_id']

            head, sep, tail = str(fixture['event_date']).partition('+')
            fp.write("INSERT INTO fixture (idfixture, begintime, hometeam,awayteam, idleague, state, oddhome, oddaway, odddraw, scoreHome, scoreAway) "
                         "VALUES ("+str(fixture['fixture_id'])+","
                             "\""+head+"\", "+str(fixture['homeTeam']['team_id'])+", "
                             +str(fixture['awayTeam']['team_id'])+","+str(fixture['league_id'])+", \""+fixture['status']+"\", 0,0,0, 0, 0);\n")


            url = "https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/"+str(idhometeam)+"/"+str(idawayteam)

            headers = {
                'x-rapidapi-key': "175d25ef14msh2b92516c1a16889p15c3e0jsndeb352ecab3a",
                'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
            }

            response = requests.request("GET", url, headers=headers)

            h2hs = response.json()

            try:
                for h2h in h2hs['api']['fixtures']:
                    head, sep, tail = str(h2h['event_date']).partition('+')
                    fp.write("\t\tINSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date)"
                             "VALUES (" + str(idh2h) + "," + str(idfixture) + "," + str(
                        h2h['homeTeam']['team_id']) + ", "
                             + str(h2h['awayTeam']['team_id']) + ",\"" + str(
                        h2h['score']['fulltime']) + "\", \"" + head + "\");\n")
                    idh2h += 1
            except:
                print("ERRO ")
                print(h2hs)

            countfixtures += 1

    print(countfixtures)

fp.close()