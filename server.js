// Package Variables

const path = require('path');
const express = require('express');
const session = require('express-session');
const expbars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

// session variable

const sesh = {
    secret: 'big secret time',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sesh));

const handlebars = expbars.create({
    helpers: {
        format_date: date => {
            return `${date.getmonth()+1}/${date.getDate()}/${date.getFullYear()}`;
        }
    }
})

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

console.log("server")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));
console.log("server")

app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}!`);
    sequelize.sync({ force: false });
});

