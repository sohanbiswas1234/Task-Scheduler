const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();


mongoose.connect("mongodb://127.0.0.1:27017/to_do_list");
const RegisterSchema=new mongoose.Schema({
   name:String,
   email:String,
   password:String
});


const app2=mongoose.model("app2",RegisterSchema);
const listSchema=new mongoose.Schema({
    email:String,
    name1:String,
    Status:String
});


var i=0;
var name5='';
let Email='';
let error='';
//let app1=Email;


const app1=mongoose.model("app1",listSchema);
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.render("home");
})

app.get("/register",function(req,res)
{
    res.render("register");
})

app.get("/login",function(req,res)
{
    res.render("login",{isvalid:true});
})


app.get("/list",function(request,response)
{
    app1.find({email:Email},function(err,to_do_list)
    {
        if(err)
        {
            console.log("there is some problem");
        }
        else{
        response.render("list",{nooflist:to_do_list,no:i});
        }
    }
    )
}
)

app.get("/get_task",function(request,response)
{
    i=0;
    app1.find({name1:name5},function(err,data)
    {
        if(err)
        {
            console.log("an unexpected error occurred");
        }
        else{
            console.log(data);
            response.render("list1",{nooflist1:data,no:i});
        }
    })
   
})

app.post("/list",function(request,response)
{
    const condition=request.body.name1;
    const name=request.body.text1;
    if(condition==='s')
    {
    const CStatus="In Progress";
    console.log(name);
    const appp=new app1(
        {
            email:Email,
            name1:name,
            Status:CStatus
        }
    );
    appp.save();
    response.redirect("/list");
    }
    else if(condition==='g')
    {
       name5=request.body.text1;
       console.log(name5);
       response.redirect("/get_task");
    }
})

app.post("/finish",function(request,response)
{
    const details=request.body;
    console.log(details);
    const id=request.body.finish;
    console.log(id);
    app1.findByIdAndUpdate(id,{Status:"Completed"},function(err)
        {
            if(err)
            {
                console.log("error while updating element");
            }
            else{
                console.log("element updated successfully");
            }
        })
    response.redirect("/list");
})

app.post("/register",function(req,res)
{
    let Name=req.body.first_name;
    Email=req.body.mail;
    let Password=req.body.password;

    const appp=new app2(
        {
            name:Name,
            email:Email,
            password: Password
        }
    )
    appp.save();
    res.redirect("/list");
})

app.post("/login",function(req,res)
{
    Email=req.body.username;
    console.log(Email);
    let Password=req.body.password;
    console.log(Password);
    app2.findOne({email:Email},function(err,data2)
    {
        if(err)
        {
            console.log("Wrong mail id");
        }
        else
        {
            if(data2.password===Password)
            {
                res.redirect("/list");
            }
            else
            {
                console.log("incorrect password");
                res.render("login",{isvalid:false});
            }
        }
    })
})

app.post("/delete",function(request,response)
{
    const details=request.body;
    console.log(details);
    const id=request.body.delete;
    console.log(id);
    app1.findByIdAndRemove(id,function(err)
    {
        if(err)
        {
            console.log("an error occured");
        }
        else{
            console.log("successfully deleted");
        }
    })
    response.redirect("/list");
})

app.listen(process.env.PORT||3000,function()
{
    console.log("server is running on port 3000");
})
