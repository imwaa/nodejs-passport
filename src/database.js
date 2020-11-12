const mongoose = require('mongoose')

const {mongodb} = require('./key')

mongoose.connect(mongodb.URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(db=>console.log('Database connected'))
    .catch(db=> console.error(err))
