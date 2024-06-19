const express= require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
const cors = require('cors');
app.use(cors());


//connnceting with mongoose

const mongoose = require('mongoose');
main().then(()=>{
    console.log("connected with databse")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolist');
}

// schema and model

const todolistSchema = new mongoose.Schema({
    task:String
});
const item = mongoose.model("task",todolistSchema)

//code
app.get('/',async (req,res)=>{
    const data = await item.find()
    res.json(data)
})
app.post('/add',(req,res)=>{
    const{add_task}=req.body;
    const element =new item ({ task:add_task });
		element.save().then((res)=>{console.log(res)})
			.catch((err)=>{ console.log(err)});
    res.end()
})
app.delete('/delete/:task_todelete',(req,res)=>{
    const {task_todelete}=  req.params
    item.deleteOne({task:task_todelete}).then((res)=>{
    	console.log(res)})
	.catch((err)=>{console.log(err)});
    res.end()
})


app.listen('8080',()=>{
    console.log("backend is started")
})
