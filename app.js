const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const {initDb} = require('./src/db/sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT||3000



app
.use(favicon(__dirname + '/favicon.ico/'))
.use(bodyParser.json())
.use(cors());

initDb();

app.get('/', (req, res) => {
    res.json('hello world');
});
require('./src/routes/findAllTests')(app);
require('./src/routes/findByPk')(app);
require('./src/routes/createTest')(app);
require('./src/routes/updateTest')(app);
require('./src/routes/deleteTest')(app);
require('./src/routes/login')(app);

app.use(({res}) =>{ 
    const message='Impossible de find';
    res.status(404).json({message});
})


app.listen(port,()=>console.log('listening on port'));