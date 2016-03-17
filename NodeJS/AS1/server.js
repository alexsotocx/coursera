var Express = require('express');
var Morgan = require('morgan');
var BodyParser = require('body-parser');


//Routers
var DishRouter = require('./dishRouter.js');
var LeaderRouter = require('./leaderRouter.js');
var PromoRouter = require('./PromoRouter.js');
//Configuration
var hostname = 'localhost';
var port = 3000;
var app = Express();

app.use(Morgan('dev'));

app.use('/dishes', DishRouter);
app.use('/promotions', PromoRouter);
app.use('/leadership', LeaderRouter);


app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
