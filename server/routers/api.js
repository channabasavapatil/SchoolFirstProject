const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const studentSchema=require('./Models/Students');
const userSchema = require('./Models/User');

const jwt = require('jsonwebtoken');
const mangoose= require('mongoose');
const bcrypt = require('bcrypt');
const checkauth = require('../../src/AuthFolder/check-auth');
// mangoose.connect("mongodb+srv://channu:channu123@cluster0-pmh4r.mongodb.net/test?retryWrites=true&w=majority")
// .then(()=>{
//   console.log('New DB COnnected');
// })
// .catch(()=>
// {
//   console.log('Commection Failed');
// })
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
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
mangoose.connect("mongodb://localhost:27017/OriginalDB",options)
.then(()=>{
  console.log('New DB COnnected');
})
.catch(()=>
{
  console.log('Connection Failed');
})

router.post('/Login',(req,res,next)=>{
  let fethecduser;
  userSchema.findOne({UserName : req.body.UserName})
  .then(user=>{
    if(!user)
    {
      response.message = "Doesnot Exist";
      res.json(response);
      return;
    }
    console.log(user);
    fethecduser = user;
    return bcrypt.compare(req.body.Password, user.Password);
  })
  .then(result=>{
  if(!result){
  response.message = "wrong Password";
  res.json(response);
  return;
  }
  const token = jwt.sign({name : fethecduser.UserName, Id: fethecduser._id},'SecretTokenPassKey',
    {expiresIn: "1h"});
    response.message = token;
    res.json(response);
  })
  .catch(err=>{

  })
})

router.post('/InsertNewUser',(req,res)=>{
  // var UsName = req.body.UserName;
  // var UsPassword = req.body.Password;

  bcrypt.hash(req.body.Password,10)
  .then(hash=> {
    const UsDB = new userSchema({
      UserName:req.body.UserName,
      Password:hash
    });
    console.log(UsDB);
    UsDB.save()
    .then(()=>{
      response.message="Succesfully Created!!";
      res.json(response);
    })
    .catch(err=>{
      response.message=err;
      response.status=401;
      res.json(response);
    })
  })
  .catch(err=>{
    response.message=err;
    console.log(err);
  });
})

router.post('/InsertNew',checkauth,(req,res)=>{
  console.log(checkauth);
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
// router.get('/SchoolName',(req,res)=>{
//     MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
//         if(err) return console.log(err);
//         var db =client.db('FirstData');
//         db.collection('MyCollection')
//         .find()
//         .toArray()
//         .then((student)=>{
//             response.data=student;
//             res.json(response);
//         })
//         .catch((err)=>
//         {
//             sendError(err,res);
//         });
//     })
// });
// router.get('/UserName',(req,res)=>{
//     MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
//         if(err) return console.log(err);
//         var db =client.db('schoolDatabase');
//         db.collection('Users')
//         .find()
//         .toArray()
//         .then((student)=>{
//             response.data=student;
//             res.json(response);
//         })
//         .catch((err)=>
//         {
//             sendError(err,res);
//         });
//     })
// });
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
