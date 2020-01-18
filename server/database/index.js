const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = 'mongodb://localhost:27017/users' 

mongoose.connect(uri).then(
    () => { 
        console.log('Connected to Mongo');  
    },
    error => {
         console.log('error connecting to Mongo: ')
         console.log(error);  
        }
  );


module.exports = mongoose.connection