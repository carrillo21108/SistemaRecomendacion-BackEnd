var session = require('../connection');

function create(req,res){
    var params = req.body;
    session
    .run("CREATE ("+params.tag+":Genre{name:'"+params.name+"',description:'"+params.description+"'})")
    .then(function(){ 
        res.send({message:'Genero agregado con exito a la DB.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function getGenres(req,res){
    var resRecord = [];

    session
    .run('MATCH (n:Genre) RETURN n')
    .then(function(result){
        result.records.forEach(function(record){
            resRecord.push(record._fields[0].properties);
        });
        
        if(resRecord.length==0){
            res.send({message:"Generos no encontrados."});
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
    getGenres
}