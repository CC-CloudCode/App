class H2HDAO(object):
    def __init__(self, dbconnection):
        self.dbconnection = dbconnection

    def insertH2Hs(self, h2hs):

        for h2h in h2hs:
            insert = "INSERT INTO h2h (idfixture, homeTeamId, awayTeamId, score, date) VALUES ( %(idfixture)s, %(homeTeamId)s, %(awayTeamId)s, %(score)s, %(date)s) "

            dados = {
                'idfixture': h2h.idfixture,
                'homeTeamId': h2h.homeTeamId,
                'awayTeamId': h2h.awayTeamId,
                'score': str(h2h.score),
                'date': h2h.date
            }


            self.dbconnection.insert(insert, dados)

