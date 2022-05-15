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

module.exports = {
    create
}