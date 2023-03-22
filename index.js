const express = require('express');
const port = 8000;

const app = express();

//set view engine
app.set("view engine", "ejs");
app.set("views", "./view");

//set static 
app.use(express.static('./assets'));
app.use(express.urlencoded({ extended: false }))

// url handler
app.use('/',require('./routes/index'));

//listen
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`server up on port ${port}`);
})