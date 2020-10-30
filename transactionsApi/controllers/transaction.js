var Transaction = require('../models/transaction')

const Transactions = module.exports

Transactions.listar= () =>{
  return Transaction.find().exec()
}

Transactions.findUserToken = (id) => {
  return Transaction
          .findOne({idUtilizador : id, estado: "Ativo"})
          .exec()
}

Transactions.createToken = (transaction) => {
  var newTransaction = new Transaction(transaction)
  return newTransaction.save()
}
