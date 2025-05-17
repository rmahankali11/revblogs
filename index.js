import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var blogs= new Map();
let it;
var title="";
var content="";
var names= new Map();
var name="";

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
    

    blogs.set(req.body.title, req.body.textContent);
    names.set(req.body.title, req.body.name);
    it=blogs.keys();
    title=req.body.title;
    content=req.body.textContent;

    res.render("blogs.ejs",{blogs, it, names});
});

app.get("/view", (req, res) => {

    title=req.query.source;
    content=blogs.get(title);
    name = names.get(title);
    res.render("view.ejs",{title, content, name});
});

app.get("/blogs", (req,res)=>{
    var action = req.query.action;
    if(action=="delete"){
        blogs.delete(title);
        names.delete(title);
    }
    it=blogs.keys();
    res.render("blogs.ejs", {blogs,it,names});
});

app.get("/edit", (req,res)=> {
    var tempTitle=title;
    var tempContent=content;
    var tempName=name;
    if(req.query.action == "post"){
        blogs.delete(title);
        names.delete(title);
    }
    res.render("edit.ejs", {tempTitle,tempContent,tempName});
    
})


