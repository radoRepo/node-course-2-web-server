const express=require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();
const port = process.env.PORT||3000;

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
    });

app.set('view engine','hbs');
//middleware lets you configure how your express app works
//it looks in the public folder for a file that matches the name of the request path (i.e. help.html). 
//If it finds it, then it serves that, if not then it sends the request to the route handlers.

//http get request
//route setup :Routing refers to how an application's endpoints (URIs) respond to client requests.
app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now} ${req.url} ${req.method}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
        console.log("Unable to append to server.log!");
        }
    });
next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// })
app.use(express.static(__dirname+'/public')); //re-order ir if needed

app.get('/',(req,res)=>{
res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to hbs view engine in Nodejs!'
});
});


app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
    pageTitle:'Projects Page'
});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle:'About Page'
});
});

app.get('/bad',(req,res)=>{
res.send({
errorMessage:"Unable to handle request"
});
});
//bind application to port in our machine


app.listen(port,()=>{
    console.log("Server running at port 3000!");
});