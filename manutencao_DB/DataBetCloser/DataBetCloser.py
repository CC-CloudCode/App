import threading
import time
from DBconnection.DBconnection import DBconnection

class DataBetCloser(threading.Thread):
    def __init__(self, dataapiconnection: DBconnection):
        super().__init__()
        self.alive = True
        self.iddletime = 20
        self.dataapiconnection = dataapiconnection

    def run(self) -> None:
        while self.alive:

            querybet = 'select * from bet where state = 0 and isDraft = 0;'

            cursor1 = self.dataapiconnection.select(querybet)

            for (idbet, date, money, iduser, state, originalbetid, isDraft) in cursor1:
                queryevents = 'select state, odd from event where idbet = ' + str(idbet)

                cursor2 = self.dataapiconnection.select(queryevents)
                oddtotal = money

                print(oddtotal)

                cursorsize = cursor2.rowcount
                print('n de eventos ' + str(cursorsize))
                wincount = 0

                for (state, odd) in cursor2:
                    print('estado ' + str(state))
                    if (state == 2):
                        print('aposta perdida')
                        updatelose = 'update bet set state = %(state)s where idbet = %(idbet)s'
                        dados = {'state': 2, 'idbet': idbet}
                        self.dataapiconnection.update(updatelose, dados)
                        break
                    if (state == 0):
                        print('evnto não terminado')
                        continue
                    if (state == 1):
                        print('evento ganho')
                        oddtotal *= odd
                        print(odd)
                        print(oddtotal)
                        wincount += 1
                if (wincount == cursorsize):
                    print('ganhou aposta')
                    updatewin = 'update bet set state = %(state)s where idbet = %(idbet)s'
                    dados = {'state': 1, 'idbet': idbet}
                    self.dataapiconnection.update(updatewin, dados)
                    # update do saldo
                    print(oddtotal)
                    updatebalanco = 'update user set balance = balance + %(oddtotal)s where iduser = %(iduser)s'


                    dados = {'oddtotal': oddtotal, 'iduser': iduser}

                    self.dataapiconnection.update(updatebalanco, dados)


            time.sleep(self.iddletime)