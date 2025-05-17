import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var blogs= new Map();
let it;
var title="";
var content="";


/*
TODO:
Upload to github?
*/
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/create",(req, res) => {
    res.render("create.ejs");
});

app.post("/blogs", (req,res) =>{
    
    console.log(blogs);
    blogs.set(req.body.title, req.body.textContent);
    it=blogs.keys();
    title=req.body.title;
    content=req.body.textContent;
    res.render("blogs.ejs",{blogs, it});
});

app.get("/view", (req, res) => {

    title=req.query.source;
    content=blogs.get(title);
    res.render("view.ejs",{title, content});
});

app.get("/blogs", (req,res)=>{
    var action = req.query.action;
    if(action=="delete"){
        blogs.delete(title);
    }
    it=blogs.keys();
    res.render("blogs.ejs", {blogs,it});
});

app.get("/edit", (req,res)=> {
    var tempTitle=title;
    var tempContent=content;
    if(req.query.action == "post"){
        blogs.delete(title);
    }
    res.render("edit.ejs", {tempTitle,tempContent});
    
})


