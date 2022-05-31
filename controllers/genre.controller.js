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

module.exports = {
    create
}