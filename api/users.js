const express = require("express");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongo = require("./db");
mongo.init(function(err){
    if(err) throw err;
    console.log('Data base connected successfully');
});

router.get('/users',function(req,res,next){
    mongo.users.find({}).toArray(function(err, result) {
        if(err) {
            return res.send(err);
        }
        return res.json(result);
    })
})
router.get('/user/:id',function(req,res,next){
    mongo.users.findOne({_id:new ObjectID(req.params.id)},function(err,doc){
        if(err){
            return res.send(err);
        }
        return res.json(doc);
    })
})
//save data
router.post('/user',function(req,res,next){
    const data = req.body;
    if(!data){
        res.status(400);
        res.send({"error":"Bad Request"});
    } else {
        mongo.users.insert(data,function(err,doc){
            if(err){
                return res.send(err);
            }
            return res.json(doc);
        })
    }
})
module.exports = router;