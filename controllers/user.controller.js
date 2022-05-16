var session = require('../connection');
var resRecord = [];

function login(req,res){
    session
    .run('MATCH(n:User) RETURN n LIMIT 25')
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });

        res.send(resRecord);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function create(req,res){
    var params = req.body;
    session
    .run("CREATE ("+params.tag+":User{name:'"+params.name+"',lastname:'"+params.lastname+"',age:"+params.age+",gender:'"+params.gender+"',mail:'"+params.mail+"',password:'"+params.password+"'})")
    .then(function(){
        res.send({message:'Usuario agregado con exito a la DB.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

module.exports = {
    login,
    create
}