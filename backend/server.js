var cur_host = 'localhost'
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: cur_host,
                user: 'user1',
                database: 'project_backend'
});

connection.connect;


var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
});
 
// this code is executed when a user clicks the form submit button
app.post('/mark', function(req, res) {
  var netid = req.body.netid;
   
  var sql = `INSERT INTO attendance (netid, present) VALUES ('${netid}',1)`;
console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });
});


app.post('/insertFav', function(req,res){
  var user_id = req.body.user_id;
  var company_id = req.body.company_id;
  
  var sql = 'insert into Favorites (UserId ,  CompanyId) values ('${user_id}', '${company_id}');';
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
      }
      //res.send( Object.assign({}, results[0]); )
    })
  });

app.get('/search_company', function(req, res) {
  var CompanyName  = req.body.CompanyName;
   
  var sql = `select companyname, companyid , state , city , street , zipcode, job_title 
  	from (CompanyInfos natural join Locations) natural join Releases 
  	where CompanyName like '${CompanyName}' `;
console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send( Object.assign({}, results[0]); )
    
  });
});

app.get('/search_zipcode', function(req, res) {
  var zipcode  = req.body.zipcode;
   
  var sql = `
(
select distinct c.CompanyName,Zipcode from test1.CompanyInfos as c 
left join test1.TempRanks as t on c.CompanyId = t.CompanyId natural join test1.Locations
where t.Ranking < 100
)
union 
(SELECT distinct CompanyName, l.Zipcode FROM test1.CompanyInfos as c 
left join test1.Locations as l on c.LocationID = l.LocationId
where Zipcode like '${zipcode}')
limit 15; `;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send( Object.assign({}, results[0]); )
    
  });
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});

