const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
mongoose.connect("mongodb+srv://sohan2002biswas:Deep1234@cluster0.5jyx4ue.mongodb.net/to_do_list");
const listSchema=new mongoose.Schema({
    name1:String,
    Status:String
}
);
var i=0;
var name5='';
const app1=mongoose.model("app1",listSchema);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response)
{
    
    app1.find({},function(err,to_do_list)
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

app.post("/",function(request,response)
{
    const condition=request.body.name1;
    const name=request.body.text1;
    if(condition==='s')
    {
    const CStatus="In Progress";
    console.log(name);
    const appp=new app1(
        {
            name1:name,
            Status:CStatus
        }
    );
    appp.save();
    response.redirect("/");
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
    response.redirect("/");
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
    response.redirect("/");
})
app.listen(process.env.PORT,function()
{
    console.log("server is running on port 3000");
})