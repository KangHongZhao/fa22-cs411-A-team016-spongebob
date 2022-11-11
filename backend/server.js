//import fetch from 'node-fetch';
//var fetch  = require("node-fetch");
var cur_host = 'localhost';
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: cur_host,
                user: 'user1',
                database: 'db1'
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
  res.render('index', { title: 'Find your h1B!' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
});

app.get('/update_success', function(req, res) {
  res.send({'message': 'Password updated successfully!'});
});

app.get('/delete_success', function(req, res) {
  res.send({'message': 'Favorite deleted successfully!'});
});

app.get('/insert_success', function(req, res) {
  res.send({'message': 'Favorite insert successfully!'});
});

app.get('/signup_success', function(req, res) {
  res.send({'message': 'Signup successfully!'});
});

app.get('/delete_success', function(req, res) {
  res.send({'message': 'Favorite deleted successfully!'});
});

    // show the result of sql
app.get('/search_success', function(req, res) {
      res.send(result);
    });

app.get('/login', function(req,res){
  var user_email = req.body.user_email == null ? "Steve_Greene9510@me.com" : req.body.user_email;
  var password  = req.body.password  == null? "after change" : req.body.password ;
  
  var sql = `select *
  from UserInfos
  where Email = "${user_email}" and Password = "${password}"`;
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
      }
      var sql_res = Object.assign({}, result);
      if (sql_res.length != 0) 
      {
        res.send(sql_res); 
      }else{
        res.redirect("/login_fail");
      }
    })
      
  });

app.post('/signup', function(req,res){
    var Name  = req.body.Name  == null ? 1 : req.body.Name;
    var Gender  = req.body.Gender  == null ? 1 : req.body.Gender;
    var Birth_date  = req.body.Birth_date == null? 1: req.body.Birth_date;
    var Phone_Number   = req.body.Phone_Number  == null ? 1 : req.body.Phone_Number;
    var Email   = req.body.Email  == null ? 1 : req.body.Email;
    var Password   = req.body.Password  == null ? 1 : req.body.Password ;

    var sql = `insert into UserInfos (Name ,Gender , Birth_date,Phone_Number, Email, Password ) values ( ${Name} , ${Gender} , ${Birth_date}, ${Phone_Number}, ${Email}, ${Password});`;
    console.log(sql);
    connection.query(sql, function(err, result) {
      if (err) {
        res.send(err)
        return;
        }
        //res.send( Object.assign({}, results[0]); )
      })
    });


app.post('/insertFav', function(req,res){
  var user_id = req.body.UserId  == null ? 1 : req.body.UserId ;
  var company_id = req.body.CompanyId  == null? 1: req.body.CompanyId ;
  
  var sql = `insert into Favorites (UserId ,  CompanyId) values ( ${user_id} , ${company_id});`;
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
  var CompanyName  = req.body.CompanyName == undefined ? 'apple' : req.body.CompanyName ;
  
  var sql = `select companyname, companyid , state , city , street , zipcode, JobTitle  
  	from (CompanyInfos natural join Locations) natural join Releases natural join Jobs
  	where CompanyName like '%${CompanyName}%' 
    limit 100`;
console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send( Object.assign({}, result) )
    
  });
});

app.get('/search_zipcode', function(req, res) {
  var zipcode  = req.body.zipcode == undefined? 61801: req.body.zipcode  ;
   
  var sql = `
(
select distinct c.CompanyName,Zipcode 
from CompanyInfos as c 
left join TempRanks as t on c.CompanyId = t.CompanyId natural join Locations
where t.Ranking < 100
limit 3
)
union 
(SELECT distinct CompanyName, l.Zipcode FROM CompanyInfos as c 
left join Locations as l on c.LocationID = l.LocationId
where Zipcode like '%${zipcode}%'
)
; `;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    
    res.send( Object.assign({}, result))
    

  });
});


// update
app.get('/update_password', function(req, res) {
  var userid = req.body.userid == null ? 2000 : req.body.userid;
  var new_password = req.body.password == null ? "after change" : req.body.password;

  var sql = `UPDATE UserInfos SET Password = '${new_password}' WHERE UserId = '${userid}' `;

console.log(sql);
connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }
  res.redirect('/update_success');
});

});

// delete
app.get('/delete_fav', function(req, res) {
  var favid = req.body.FavoriteId == null? 5002 : req.body.FavoriteId;

  var sql = `DELETE FROM Favorites WHERE FavoriteId = '${favid}' `;

console.log(sql);
connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }
  res.redirect('/delete_success');
});

});


// advanced query II
app.get('/search_keyword', function(req, res) {
  var keyword = req.body.keyword == null? "software" : req.body.keyword;

  var sql = 'select max(CompanyId) as CompanyId, CompanyName, count(JobTitle) as H1B_counts ' +
      'from CompanyInfos natural join Releases natural join Jobs ' +
      `where JobTitle like '%${keyword}%' ` +
      'group by CompanyName limit 100' ;

console.log(sql);
connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }

  res.send( Object.assign({}, result))

  
});

});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
/*
async function test() {
  const myBody = {'user_id': 1, 'company_id':1}
  const response = await fetch('http://localhost/insertFav', {
    method: 'POST',
    body: myBody, 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response;
  console.log(myJson);
};
*/