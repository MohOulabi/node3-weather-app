const path = require('path');
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');

//Setting up view engine as handlebars
const viewsPath = path.join(__dirname, '../', 'views');
const layoutPath = path.join(__dirname, '../', 'views/layout');
const partialsPath = path.join(__dirname, '../', 'views/partials');

const port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
    helpers: {
        section: function (name, options) {
            if (!this.section) this.section = {};
            this.section[name] = options.fn(this);
            return null;
        },
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', viewsPath);

//Setting up public folder
const publicDir = express.static(path.join(__dirname, '../', 'public'));
app.use(publicDir);

//Getting routes from routes folder
require('../routes/routes')(app);



app.listen(port, () => {
    console.log('Server is up on port' + port);
});