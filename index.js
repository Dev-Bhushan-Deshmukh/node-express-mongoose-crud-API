const express=require('express');
const mongoose=require('mongoose');
const port=8080
const app=express();

app.use(express.json()) 

mongoose.connect('mongodb://127.0.0.1:27017/task-user',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('connected')})



const user=mongoose.Schema({
    task:String,
    priority:String,
    status:String,
    start:String,
    end:String
    
    
    
    })
const taskModel=mongoose.model('tasks',user);



app.get('/',async(req,res)=>{

  
const data=await taskModel.find({})


res.send(data)

})

app.get('/get_one/:id',async(req,res)=>{






    try {
        const {id}=req.params;
        const update_one=await taskModel.findById(id);
        res.status(200).json(update_one);
            
        } catch (error) {
            res.status(500).json({message:error.message});
            
        }



//     const ss=req.body;
//     console.log("sss",ss)
// res.json({requestBody: req.body})
//   await taskModel.updateMany({'task':'t1'},{$set:{'priority':"good"}})


})
app.post('/send_record',async(req,res)=>{

    try{
        const task= await taskModel.create(req.body);

        res.status(200).json(task);

    }
    catch(error){
res.status(500).json({message:error.message})

    }


// const entery_=new taskModel({

//     task:"b1",
//     priority:"low",
//     status:"working",
//     start:"1-0-97",
//     end:".11.."


// })
// await entery_.save()


})

app.delete('/delete_one/:id',async(req,res)=>{
try {
    
const {id}=req.params;

const delete_task=await taskModel.findByIdAndDelete(id);
if(!delete_task)
 {


return res.status(404).json('task does not exis');

 }
const all_record= await taskModel.find({});

res.status(200).json(all_record)


} catch (error) {
    

    res.status(404).json({message:error.message});
}



})

app.delete('/delete_all',async(req,res)=>{

try {
    

    await taskModel.deleteMany({});

res.status(200).json('deleted all !')


} catch (error) {
  res.status(500).json({message:error.message});  
}






})

app.put('/update_one/:id',async(req,res)=>{
const {id}=req.params;
try {
const update_task=await taskModel.findByIdAndUpdate(id,req.body);
if(!update_task)
{

    return res.status(404).json('id does not exist');
}
const updated_task=await taskModel.findById(id);

res.status(200).json(updated_task);
    
} catch (error) {
    res.status(500).json({message:error.message});
    
}



})


app.listen(port,()=>{

console.log("running on port:",{port});

})

