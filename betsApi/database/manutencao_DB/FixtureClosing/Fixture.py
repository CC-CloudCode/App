import threading
import traceback
import sys
from datetime import datetime

class Fixture(object):
    def __init__(self, idfixture, endtime):
        self.waitEnd = threading.Condition()
        self.endtime = endtime
        self.idfixture = idfixture

    def endFixture(self):
        self.waitEnd.acquire()

        try:
            while datetime.now() <= self.endtime:
                print("Fiz lock de um jogo e vou dormir")
                self.waitEnd.wait()
            # fechar apostas
            # faz pedido do status
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