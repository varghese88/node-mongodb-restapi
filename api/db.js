const mongodb = require('mongodb').MongoClient;
const _ = require('lodash');
const fs = require('fs');
let url = '';
if(!_.isEmpty(process.env.USER_NAME) && !_.isEmpty(process.env.PASSWORD)){
    url = 'mongodb://'+ process.env.USER_NAME + ':'+ process.env.PASSWORD + '@'+ process.env.URL + '/tasklist';
} else {
    url = 'mongodb://'+ process.env.URL + '/tasklist';
}
const createCollection = (db,collectionName,callback) => {
    db.createCollection(collectionName,function(err, results) {
        console.log("------------Collection created.------------");
        callback(err)
    });
};

const dataInsertion = (db,collection,callback) => {
    fs.readFile('./api/data.json', 'utf8', (err, data) => {
        if(err) throw err;
        collection.insert(JSON.parse(data),(err, docs) => {
            db.close();
            callback(err)
        });
    })
};
const collectionCount = (db,collection,callback) => {
    collection.count().then((count,err) => {
        if(err) throw err
        if(count === 0){
            dataInsertion(db,collection,(err) => {
                callback(err)
            });
        }
    })
} 
module.exports.init =  (callback) => {
    mongodb.connect(url,(err, db) => {
        callback(err);  
        module.exports.db = db
        createCollection(db,'users',(err) => {
            if(err) throw err;
            const collection = db.collection('users');
            module.exports.users = collection;
            collectionCount(db,collection,(err) => {
                if(err) throw err;
                console.log("------------Data inserted sucessfully.------------")
            })
        })        
    })
}
