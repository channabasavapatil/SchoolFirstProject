const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const studentSchema=require('./Models/Students');
const mangoose= require('mongoose');
// mangoose.connect("mongodb+srv://channu:channu123@cluster0-pmh4r.mongodb.net/test?retryWrites=true&w=majority")
// .then(()=>{
//   console.log('New DB COnnected');
// })
// .catch(()=>
// {
//   console.log('Commection Failed');
// })
mangoose.connect("mongodb://localhost:27017/OriginalDB")
.then(()=>{
  console.log('New DB COnnected');
})
.catch(()=>
{
  console.log('Connection Failed');
})
router.post('/InsertNew',(req,res)=>{
  var name=(req.body.Name);
  var FName = (req.body.sFName);
  var Grade = (req.body.Grade);
  var Fees = parseInt(req.body.Class);
  const StdDB = new studentSchema({
    Name: name,
    FatherName: FName,
    Fees:   Fees,
    class: Grade,
    Passed: 'Yes'
  });
  StdDB.save()
  .then(
    ()=>
    {
      response.message="success";
      res.json(response);
    })
})
const connection = (closure)=>{
    return MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        if(err) return console.log(err);
        var db = client.db('AngularDB');
    })
};
const sendError=(err,res)=>{
    response.status=501;
    response.message=typeof err=='object'?err.message:err;
    res.status(501).json(response);
};
let response={
    status:200,
    data:[],
    message:null
}
router.get('/users',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        if(err) return console.log(err);
        var db =client.db('OriginalDB');
        db.collection('studentschemas')
        .find()
        .sort({_id:-1})
        .toArray()
        .then((student)=>{
            response.data=student;
            res.json(response);
        })
        .catch((err)=>
        {
            sendError(err,res);
        });
    })
});
router.get('/Tabs',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        if(err) return console.log(err);
        var db =client.db('channu123');
        db.collection('FirstData')
        .find()
        .toArray()
        .then((student)=>{
            response.data=student;
            res.json(response);
        })
        .catch((err)=>
        {
            sendError(err,res);
        });
    })
});
router.get('/SchoolName',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        if(err) return console.log(err);
        var db =client.db('FirstData');
        db.collection('MyCollection')
        .find()
        .toArray()
        .then((student)=>{
            response.data=student;
            res.json(response);
        })
        .catch((err)=>
        {
            sendError(err,res);
        });
    })
});
router.get('/UserName',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        if(err) return console.log(err);
        var db =client.db('schoolDatabase');
        db.collection('Users')
        .find()
        .toArray()
        .then((student)=>{
            response.data=student;
            res.json(response);
        })
        .catch((err)=>
        {
            sendError(err,res);
        });
    })
});
router.get('/UserName/:user',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
        const requestedCatName = req.params['user'];
        if(err) return console.log(err);
        var db =client.db('schoolDatabase');
        db.collection('Users')
        .find({"ID": requestedCatName})
        .toArray()
        .then((student)=>{
            response.data=student;
            res.json(response);
        })
        .catch((err)=>
        {
            sendError(err,res);
        });
    })
});
// router.post('/InsertNew',(req,res)=>{
//     MongoClient.connect('mongodb://localhost:27017/',(err,client)=>{
//         if(err) return console.log(err);
//         var name=(req.body.Name);
//         var FName = (req.body.FName);
//         var Grade = (req.body.Grade);
//         var Fees = parseInt(req.body.Class);
//         const StdDB= new studentSchema({
//           Name: name,
//           FatherName: FName,
//           Fees:   Fees,
//           class: Grade,
//           Passed: 'Yes'
//         });
//         var db =client.db('AngularDB');
//         db.collection('studentCollection')
//         .insertOne(req.body)
//         .then((student)=>{
//           response.message='Done success';
//         })
//         .catch((err)=>
//         {
//             sendError(err,res);
//         });
//       //   try
//       //   {
//       //   console.log('Entered NEW');
//       //   var name=(req.body.Name);
//       //   var FName = (req.body.FName);
//       //   var Grade = (req.body.Grade);
//       //   var Fees = parseInt(req.body.Class);
//       //   const StdDB= new studentSchema({

//       //     Name: name,
//       //     FatherName: FName,
//       //     Fees:   Fees,
//       //     class: Grade,
//       //     Passed: 'Yes'
//       //   });
//       //   StdDB.save();
//       //   console.log('Completed');
//       // }
//       // catch(err)
//       // {
//       //   console.log(err.message);
//       // }
//     })
// });
router.get('/individualuser/:id',(req,res)=>{
  MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    var requestedCatName = req.params['id'];
    if(err) return console.log(err);
    var db =client.db('OriginalDB');
    db.collection('studentschemas')
    .find({"_id": new ObjectID(requestedCatName)})
    .toArray()
    .then((student)=>{
        response.data=student;
        res.json(response);
    })
    .catch((err)=>
    {
        sendError(err,res);
    });
});
});

module.exports=router;
