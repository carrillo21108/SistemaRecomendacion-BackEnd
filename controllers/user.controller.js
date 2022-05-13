var neo4j = require('neo4j-driver');
var driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j','admin123$'));
var session = driver.session();
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
    });
}

module.exports = {
    login
}