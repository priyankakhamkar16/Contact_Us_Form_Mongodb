require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3003;

const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connection successful');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Schema and Model
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  country: String,
  message: String
});

const Users = mongoose.model('data', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
