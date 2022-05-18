var session = require('../connection');
var resRecord = [];

function create(req,res){
    var params = req.body;
    session
    .run("CREATE ("+params.tag+":Movie{name:'"+params.name+"',api_id:'"+params.api_id+"'})")
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

module.exports = {
    create,
    genre
}