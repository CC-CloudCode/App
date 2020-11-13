import http.client

conn = http.client.HTTPSConnection("rapidapi.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "175d25ef14msh2b92516c1a16889p15c3e0jsndeb352ecab3a",
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }

conn.request("GET", "/v2/leagues/country/england/2018", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))


# povoar
# get countries      https://api-football-v1.p.rapidapi.com/v2/countries
    # get leagues by country     https://api-football-v1.p.rapidapi.com/v2/leagues/country/{country}
        # get teams by league             https://api-football-v1.p.rapidapi.com/v2/teams/league/{league_id}
            # get stats, etc by team by league
                # stats         https://api-football-v1.p.rapidapi.com/v2/statistics/{league_id}/{team_id}
                # standings     https://api-football-v1.p.rapidapi.com/v2/leagueTable/{league_id}   <- pode ser usada para ir buscar as equipas, stats?
            # get fixtures depois de ter as equipas todas na bd
                # fixtures      https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/{league_id}
                                # https://api-football-v1.p.rapidapi.com/v2/fixtures/team/{team_id}/{league_id}?timezone=Europe/London
                # odd           https://api-football-v1.p.rapidapi.com/v2/odds/fixture/{fixture_id}
                # h2h           https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/{team_id}/{team_id}
                # score

# depois nao e preciso atualizar sempre isto tudo