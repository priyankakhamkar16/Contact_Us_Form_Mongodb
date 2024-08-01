// require('dotenv').config();
// const express = require('express')
// const mongoose = require('mongoose')
// const path = require('path')
// const port = 3003

// const app = express()

// app.use(express.static(__dirname))
// app.use(express.urlencoded({extended:true}))

// mongoose.connect(process.env.MONGODB_URI)
// const db = mongoose.connection
// db.once('open',()=>{
//     console.log("Mongodb connection successful")
// })

// const userSchema = new mongoose.Schema({
//     firstname:String,
//     lastname:String,
//     phone:String,
//     country:String,
//     message:String

// })

// const Users = mongoose.model("data",userSchema)

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'))
// })

// app.post('/post',async(req,res)=>{
//     const {firstname,lastname,phone,country,message} = req.body
//     const user = new Users({
//         firstname,
//         lastname,
//         phone,
//         country,
//         message
//     })
//     await user.save()
//     console.log(user)
//     res.send("Form Submission Successful")
// })

// app.listen(port,()=> {
//     console.log("Server Started")
// })
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3003;

const app = express();

// Serve static files from the main project directory
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongodb connection successful');
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  country: String,
  message: String
});

const Users = mongoose.model('data', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  const { firstname, lastname, phone, country, message } = req.body;
  const user = new Users({
    firstname,
    lastname,
    phone,
    country,
    message
  });
  await user.save();
  console.log(user);
  res.send('Form Submission Successful');
});

app.listen(port, () => {
  console.log('Server Started');
});
