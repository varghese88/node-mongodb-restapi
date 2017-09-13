const mongodb = require('mongodb').MongoClient;
const config = require('./config');
const _ = require('lodash');
const fs = require('fs');
let url = '';

if(!_.isEmpty(config.user) && !_.isEmpty(config.password)){
    url = 'mongodb://'+ config.user+':'+config.password+'@'+config.ip+':'+config.port+'/tasklist';
} else {
    url = 'mongodb://'+ config.ip+':'+config.port+'/tasklist';
}
const createCollection = function(db,collectionName) {
    db.createCollection(collectionName,function(err, results) {
        console.log("Collection created.");
    });
};
module.exports.init = function (callback) {
    mongodb.connect(url,function(err, db) {
        callback(err);  
        module.exports.db = db
        createCollection(db,'users');
        const collection = db.collection('users');
        module.exports.users = collection;
        collection.count().then(function(count,err){
            if(err) throw err
            if(count === 0){
                fs.readFile('./api/data.json', 'utf8', function (error, data) {
                    if(err) throw err;
                    collection.insert(JSON.parse(data), function(err, docs) {
                        console.log('Data inserted');
                        db.close();
                    });
                })
            }
            
        })        
    })
}
