var session = require('../connection');

function login(req,res){
    var params = req.body;
    var resRecord = [];

    session
    .run('MATCH (n:User) WHERE n.mail="'+params.mail+'" AND n.password="'+params.password+'"RETURN n')
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });
        
        if(resRecord.length==0){
            res.send({message:"Contraseña y/o correo electrónico incorrecto."});
        }else{
            res.send(resRecord);
        }
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

function likeMovie(req,res){
    var params = req.body;
    session
    .run("MATCH (a:User),(b:Movie) WHERE a.mail = '"+params.mail+"' AND b.name = '"+params.movieName+"' CREATE (a)-[:IN_LIKE_MOVIE]->(b)")
    .then(function(){
        res.send({message:'Relacion IN_LIKE_MOVIE creada con exito.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function dislikeMovie(req,res){
    var params = req.body;
    session
    .run('MATCH (a:User)-[r:IN_LIKE_MOVIE]->(b:Movie) WHERE a.mail = "'+params.mail+'" AND b.name = "'+params.movieName+'" DELETE r')
    .then(function(){
        res.send({message:'Relacion IN_LIKE_MOVIE eliminada con exito.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function likeGenre(req,res){
    var params = req.body;
    session
    .run("MATCH (a:User),(b:Genre) WHERE a.mail = '"+params.mail+"' AND b.name = '"+params.genreName+"' CREATE (a)-[:IN_LIKE_GENRE]->(b)")
    .then(function(){
        res.send({message:'Relacion IN_LIKE_GENRE creada con exito.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function dislikeGenre(req,res){
    var params = req.body;
    session
    .run('MATCH (a:User)-[r:IN_LIKE_GENRE]->(b:Genre) WHERE a.mail = "'+params.mail+'" AND b.name = "'+params.genreName+'" DELETE r')
    .then(function(){
        res.send({message:'Relacion IN_LIKE_GENRE eliminada con exito.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}


module.exports = {
    login,
    create,
    likeMovie,
    dislikeMovie,
    likeGenre,
    dislikeGenre
}