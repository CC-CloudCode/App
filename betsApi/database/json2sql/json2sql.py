import json

fp = open("povoamento.sql", "w")

# TEAMS
# https://rapidapi.p.rapidapi.com/v2/leagues/country/england/2020
with open('premier.json') as f:
  data = json.load(f)

idteam = 1
for team in data['api']['teams']:
    fp.write("INSERT INTO team (idteam, idapi, name, logo) VALUES ("+str(idteam)+", "+str(team['team_id'])+", \""+str(team['name'])+"\", \""+team['logo']+"\");\n")
    idteam += 1

fp.write("\n\n")

# LEAGUES
# https://rapidapi.p.rapidapi.com/v2/teams/league/2790
with open('ligasInglaterra.json') as f:
  data = json.load(f)

idleague = 1
for league in data['api']['leagues']:
    fp.write("INSERT INTO league (idleague, idapi, name, logo, idcountry) VALUES ("+str(idleague)+", "+str(league['league_id'])+", \""+league['name']+"\", \""+league['logo']+"\", 1);\n")
    idleague += 1


fp.close()

fp = open("povoamento.sql", "r")
print(fp.read())
