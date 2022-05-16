var neo4j = require('neo4j-driver');
var driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j','admin123$'));
var session = driver.session();

module.exports = session;