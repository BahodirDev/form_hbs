const express = require('express');
const app = express();
const pool = require('./config/db');
const dot = require('dotenv');
dot.config();
const path = require('path');
const { engine } = require('express-handlebars');
const { urlencoded } = require('express');

app.use(express.json( { extended: false } ));
app.use(express.urlencoded({extended:false}));


app.engine(".hbs", engine({ extname: ".hbs" }));
app.set('view engine', '.hbs');
app.set('views', './views');

// routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
    // res.render('index',{title:"Access"})
})


// forms
app.get('/form',(req,res)=>{
    res.render("form")
})

app.post('/insert',async(req,res)=>{
    const {name,last_name,tel} = req.body;
    const data = await pool.query("INSERT INTO users(name,last_name,tel) VALUES($1,$2,$3) returning *",[name,last_name,tel])
        console.log(data.rows[0]);
    res.redirect("/form")
})

app.get("/api", async (req, res) => {
    const data = await pool.query("SELECT * FROM users");
    console.log(data.rows);
    res.render('index', { title: data.rows });
    // res.json(data.rows)
});

app.get("/api/:id", async (req, res) => {
    const postId = req.params.id
    const data = await pool.query("SELECT * FROM users WHERE id = " + postId);
    res.json(data.rows)
});

app.get("/users/:name", async (req, res) => {
    const postId = req.params.name;
    const data = await pool.query("SELECT * FROM users WHERE name = " + postId);
    res.json(data.rows);
})


app.use(express.static("public"))



app.listen(5000, () => {
    console.log('SERVER');
})















// CAREATE TABLE
// CAREATE DATABASE
// INSERT INTO tabel_name VALUE
// SELECT *, (name,last_name) FROM users;


// news
// SELECT name FROM users WHERE id = 6;
// SELECT * FROM users  ORDER BY name;
// SELECT * FROM users  ORDER BY name DESC;


// CRUD

// Create = INSERT INTO table_name() VALUES();
// Delete = DROP table,database  || DELETE FROM users WHERE id =

// OFFSET || LIMIT ||


// NODEJS modullar
// PATH
// OS
// FS
// HTTP