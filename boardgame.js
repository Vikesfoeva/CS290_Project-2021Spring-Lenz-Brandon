let express = require('express');

let app = express();
let handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
let session = require('express-session');
let bodyParser = require('body-parser');
let request = require('request');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'abc123' }));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// Inlcudes logic for processing the body
app.get('/', function (req, res) {
  let context = {};

  res.render('home', context);
});

app.get('/reviews', function (req, res) {
  let context = {};
  res.render('reviews', context);
});

app.get('/choose', function (req, res) {
  let context = {};
  res.render('choose', context);
});

app.get('/contribute', function (req, res) {
  let context = {};
  res.render('contribute', { context, layout: 'main' });
});

app.get('/reviews/dominion', function (req, res) {
  let context = {};
  res.render('games/dominion', { context, layout: 'reviews' });
});

app.get('/reviews/gameofthrones', function (req, res) {
  let context = {};
  res.render('games/gameofthrones', { context, layout: 'reviews' });
});

app.get('/reviews/terraformingmars', function (req, res) {
  let context = {};
  res.render('games/terraformingmars', { context, layout: 'reviews' });
});

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on a host at port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
