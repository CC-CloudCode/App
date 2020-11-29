import abc

class DBconnection(metaclass=abc.ABCMeta):
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, '__init__') and
                callable(subclass.__init__) and
                hasattr(subclass, 'connect') and
                callable(subclass.connect) and
                hasattr(subclass, 'insert') and
                callable(subclass.insert) and
                hasattr(subclass, 'select') and
                callable(subclass.select) or
                NotImplemented)

    @abc.abstractmethod
    def __init__(self, user, password, host, database):
        raise NotImplementedError

    @abc.abstractmethod
    def connect(self):
        raise NotImplementedError

    @abc.abstractmethod
    def select(self, query):
        raise NotImplementedError

    @abc.abstractmethod
    def insert(self, insert, dados):
        raise NotImplementedError
