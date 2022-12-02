let express = require('express');
let bodyParser = require('body-parser')
let app = express();https://boilerplate-express.pierocarrion.repl.co

absolutePath = __dirname + '/views/index.html'

//Middleware
app.use('/public', express.static(__dirname + '/public'))
app.use(function(req,res,next){
  console.log(req.method, req.path,'-', req.ip)
  console.log('Result', res)
  next();
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//Endpoints
app.get("/", function(req,res){
  res.sendFile(absolutePath)
});

app.get('/json', function(req, res){
  let response = "Hello json";
  const SECRET = process.env.MESSAGE_STYLE
  if(SECRET == 'uppercase'){
    response = response.toUpperCase();
  }
  res.json({"message": response})
})

app.get('/now', function(req, res, next) {
  
  req.time = new Date().toString();
  next();
},function(req,res,next){
  res.json({"time": req.time})
})
app.get('/:word/echo', function(req,res){
  word = req.params.word
  res.json({"echo":word})
})
app.get('/name', function(req,res){
  name = `${req.query.first} ${req.query.last}`
  res.json({"name":name})
})

app.post('/name',function(req,res){
  body = `${req.body.first} ${req.body.last}`
  res.json({"name": body})
})








 module.exports = app;
