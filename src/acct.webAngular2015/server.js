var
express = require(
'express'
);

//CREATE APP
var
app = express();

//LOCATION OF STATIC CONTENT IN YOUR FILESYSTEM
app.use(express.static(__dirname + '/wwwroot'));

app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/wwwroot/index.html');
});

//PORT TO LISTEN TO
app.listen(1337);