//Install express server
const express = require('express');
const path = require('path');

const PORT = normalizePort(process.env.PORT ||'4200');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/students-manager-angular'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname,'/dist/students-manager-angular/index.html'));
});

app.listen(PORT, console.log(`Server listening at port ${PORT}`));

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
