import threading
import traceback
import sys
from datetime import datetime
from APICommunication.APICommunication import APICommunication

class Fixture(object):
    def __init__(self, idfixture, endtime, apiconnection, fixturesdao, dataconnection):
        self.waitEnd = threading.Condition()
        self.endtime = endtime
        self.idfixture = idfixture
        self.apiconnection = apiconnection
        self.fixturesdao =  fixturesdao
        self.dataconnection = dataconnection

    def endFixture(self):
        self.waitEnd.acquire()

        try:
            while datetime.now() <= self.endtime:
                print(self.endtime)
                print("Fiz lock de um jogo e vou dormir")
                self.waitEnd.wait()

            statusEscore = self.apiconnection.getScore(self.idfixture)

            result = 0

            while statusEscore['status'] != 'Match Finished':
                statusEscore = self.apiconnection.getScore(self.idfixture)
                print('status ' + statusEscore['status'] + '  score ' + statusEscore['score'])
                self.waitEnd.wait()

            print('status ' + statusEscore['status'] + '  score ' + statusEscore['score'])

            self.fixturesdao.updateStateEScore(self.idfixture, statusEscore['status'], statusEscore['score'])

            print('Atualizei state da bets db')

            query = 'select idevent, bettype from event where idbetapi = ' + str(self.idfixture)


            cursor = self.dataconnection.select(query)

            for(idevent, bettype) in cursor:
                # notdef 0
                # win 1
                # lose 2

                head, sep, tail = str(statusEscore['score']).partition('-')

                homescore = head
                awayscore = tail

                if homescore > awayscore:
                    if bettype == 0:
                        result = 1
                    else:
                        result = 2
                if awayscore > homescore:
                    if bettype == 2:
                        result = 1
                    else:
                        result = 2
                if homescore == awayscore:
                    if bettype == 1:
                        result = 1
                    else:
                        result = 2

                update = 'update event set state = %(result)s where idevent = %(idevent)s'

                data = {'result': result, 'idevent': idevent}

                self.dataconnection.update(update, data)

            # Verifica se já acabou, se não tiver acabo entra noutro ciclo (excepto se for adiado...)
            # faz update do status e score da fixture

        except:
            traceback.print_exception(*sys.exc_info())
        finally:
            self.waitEnd.release()
            print("Release: " + str(self.idfixture))

    def lock(self):
        self.waitEnd.acquire()

    def unlock(self):
        self.waitEnd.release()

    def notify(self):
        self.waitEnd.acquire()
        self.waitEnd.notifyAll()
        self.waitEnd.release()