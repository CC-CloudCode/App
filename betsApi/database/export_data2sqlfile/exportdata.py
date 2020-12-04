import mysql.connector

con = mysql.connector.connect(user='bettingspree', password='PEI2020', host='127.0.0.1', database='betsbettingspree', auth_plugin='mysql_native_password')

fp = open("export.sql", "w", encoding="utf-8")

cursor = con.cursor(buffered=True)


cursor.execute("select * from country")

for (idcountry, name, flag) in cursor:
    fp.write("INSERT INTO country (idcountry, name, flag) VALUES (\""+str(idcountry)+"\", \""+name+"\", \""+flag+"\");\n")


cursor = con.cursor(buffered=True)

cursor.execute("select * from league")

for (idleague, name, logo, idcountry) in cursor:
    fp.write("INSERT INTO league (idleague, name, logo, idcountry) VALUES ("+str(idleague)+", \""+name+"\", \""+logo+"\", \""+str(idcountry)+"\");\n")



cursor = con.cursor(buffered=True)

cursor.execute("select * from team")


for (idteam, name, logo) in cursor:
    fp.write("INSERT INTO team (idteam, name, logo) VALUES (" + str(idteam) + ", \"" + name + "\", \"" + logo + "\");\n")

cursor = con.cursor(buffered=True)

cursor.execute("select * from team_stats")

for (idteam_stats, idleague, idteam, matchsPlayedHome, matchsPlayedAway, winsHome, winsAway, drawsHome, drawsAway, losesHome, losesAway, goalsForHome, goalsForAway, goalsAgainstHome, goalsAgainstAway, matchsPlayedTotal, winsTotal, drawsTotal, losesTotal, goalsForTotal, goalsAgainstTotal, goalsDiff, position, group, points, forme) in cursor:
    fp.write("INSERT INTO team_stats (idteam_stats, idleague, idteam, "
             "matchsPlayedHome, matchsPlayedAway, winsHome,"
             "winsAway, drawsHome, drawsAway, "
             "losesHome, losesAway, goalsForHome,"
             "goalsForAway, goalsAgainstHome, goalsAgainstAway,"
             "matchsPlayedTotal, winsTotal, drawsTotal, "
             "losesTotal, goalsForTotal, goalsAgainstTotal, "
             "goalsDiff, position, team_stats.group, points, forme) "
             "VALUES (" + str(idteam_stats) + ", " + str(idleague) + ", " + str(idteam) + ","
             + str(matchsPlayedHome) + "," + str(matchsPlayedAway) + "," + str(
        winsHome) + ","
             + str(winsAway) + "," + str(drawsHome) + "," + str(drawsAway) + ","
             + str(losesHome) + "," + str(losesAway) + "," + str(
        goalsForHome) + ","
             + str(goalsForAway) + "," + str(goalsAgainstHome) + "," + str(
        goalsAgainstAway) + ","
             + str(matchsPlayedTotal) + "," + str(winsTotal) + "," + str(
        drawsTotal) + ","
             + str(losesTotal) + "," + str(goalsForTotal) + "," + str(
        goalsAgainstTotal) + ","
             + str(goalsDiff) + "," + str(position) + ",\"" + group + "\", "
             + str(points) + ",\"" + forme + "\");\n")

cursor = con.cursor(buffered=True)

cursor.execute("select * from fixture")

for (idfixture, begintime, homeTeam, awayTeam, idleague, state, oddHome, oddAway, oddDraw, scoreHome, scoreAway) in cursor:
    fp.write("INSERT INTO fixture (idfixture, begintime, hometeam,awayteam, idleague, state, oddhome, oddaway, odddraw, scoreHome, scoreAway) "
                "VALUES (" + str(idfixture) + ", \"" + begintime.strftime("%Y-%m-%dT%H:%M:%S") + "\", " + str(homeTeam) + ", "
                + str(awayTeam) + "," + str(idleague) + ", \"" + state + "\", "+str(oddHome)+","+str(oddAway)+","+str(oddDraw)+", "+str(scoreHome)+", "+str(scoreAway)+");\n")

cursor = con.cursor(buffered=True)

cursor.execute("select * from h2h")

for (idh2h, idfixture, homeTeamId, awayTeamId, score, date) in cursor:
    fp.write("INSERT INTO h2h (idh2h, idfixture, homeTeamId, awayTeamId, score, date) VALUES (" + str(idh2h) + "," + str(idfixture) + "," + str(
        homeTeamId) + ", "+ str(awayTeamId) + ",\"" + score + "\", \"" + date.strftime("%Y-%m-%dT%H:%M:%S") + "\");\n")



