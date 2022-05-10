//View Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

var driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j','admin123$'));
var session = driver.session();

app.get('/',function(req,res){
    session
        .run('MATCH(n:Actor) RETURN n LIMIT 25')
        .then(function(result){
            result.records.forEach(function(record){
                console.log(record._fields[0].properties);
            });

            res.render('index');
        })
        .catch(function(err){
            console.log(err);
        });
});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;