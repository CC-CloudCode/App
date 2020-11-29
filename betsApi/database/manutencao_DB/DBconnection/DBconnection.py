import abc

class DBconnection(metaclass=abc.ABCMeta):
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, '__init__') and
                callable(subclass.__init__) or
                NotImplemented)

    @abc.abstractmethod
    def __init__(self, user, password, host, database):
        raise NotImplementedError
