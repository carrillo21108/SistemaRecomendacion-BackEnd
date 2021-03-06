var session = require('../connection');

function create(req,res){
    var params = req.body;
    session
    .run("CREATE ("+params.tag+":Movie{name:'"+params.name+"',api_id:"+params.api_id+"})")
    .then(function(){
        res.send({message:'Pelicula agregada con exito a la DB.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function genre(req,res){
    var params = req.body;
    session
    .run("MATCH (a:Movie),(b:Genre) WHERE a.name = '"+params.movieName+"' AND b.name = '"+params.genreName+"' CREATE (a)-[:IN_GENRE]->(b)")
    .then(function(){
        res.send({message:'Relacion IN_GENRE creada con exito.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function getMovies(req,res){
    var resRecord = [];

    session
    .run('MATCH (n:Movie) RETURN n')
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });
        
        if(resRecord.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(resRecord);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function genreRecommendation(req,res){
    var resRecord = [];
    var params = req.body;

    session
    .run("MATCH movies = (a:User)-[:IN_LIKE_GENRE]->(genre)<-[:IN_GENRE]-(b:Movie) WHERE a.mail='"+params.mail+"' RETURN b")
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });
        
        if(resRecord.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(resRecord);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function userRecommendation(req,res){
    var resRecord = [];
    var params = req.body;

    session
    .run("MATCH movies = (a:User)-[:IN_LIKE_GENRE]->(f:Genre)<-[:IN_LIKE_GENRE]-(b:User)-[:IN_LIKE_MOVIE]->(c:Movie) WHERE a.mail='"+params.mail+"' RETURN DISTINCT c")
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });
        
        if(resRecord.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(resRecord);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

module.exports = {
    create,
    genre,
    getMovies,
    genreRecommendation,
    userRecommendation
}