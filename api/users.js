const express = require("express");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongo = require("./db");
// initialize data base
mongo.init((err)=>{
    if(err) throw err;
    console.log('-------------Data base connected successfully.--------------');
});
// retreive single data
router.get('/users',(req,res,next)=>{
    mongo.users.find({}).toArray((err, result) => {
        if(err) {
            return res.send(err);
        }
        return res.json(result);
    })
});
// retreive single data
router.get('/user/:id',(req,res,next)=>{
    mongo.users.findOne({_id:new ObjectID(req.params.id)},(err,doc)=>{
        if(err){
            return res.send(err);
        }
        return res.json(doc);
    })
});
//save data
router.post('/user',(req,res,next)=>{
    const data = req.body;
    if(!data){
        res.status(400);
        res.send({"error":"Bad Request"});
    } else {
        mongo.users.insert(data,(err,doc)=>{
            if(err){
                return res.send(err);
            }
            return res.json(doc);
        })
    }
});
// delete record
router.delete('/user/:id',(req,res,next)=>{
    mongo.users.remove({_id:new ObjectID(req.params.id)},(err,doc)=>{
        if(err){
            return res.send(err);
        }
        return res.json(doc);
    })
});
// update record
router.put('/user/:id',(req,res,next)=>{
    const data = req.body;

    if(!data){
        res.status(400);
        res.send({"error":"Bad Request"});
    } else {
        mongo.users.update({_id:new ObjectID(req.params.id)},data,(err,doc)=>{
            if(err){
                return res.send(err);
            }
            return res.json(doc);
        })
    }
});
module.exports = router;