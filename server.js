const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()
// const fs = require('fs');
const port = 5000;
const uri = process.env.MONGO_URI;

// Mongoose schema for the counter
const CounterSchema = new mongoose.Schema({
    _id: String,
    count: Number
});
const Counter = mongoose.model('Counter', CounterSchema);

// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB with Mongoose!");
        // Ensure the count is initialized in the database
        Counter.findById('mainCounter').then(document => {
            if (!document) {
                new Counter({ _id: 'mainCounter', count: 0 }).save();
            }
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });
    
// Serve static files from both the frontend and backend directories
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/backend', express.static(path.join(__dirname, 'backend')));

app.get('/api/count', async (req, res) => {
    const document = await Counter.findById('mainCounter');
    res.json({ count: document ? document.count : 0 });
});

app.post('/api/increment', async (req, res) => {
    const document = await Counter.findByIdAndUpdate('mainCounter', 
    { $inc: { count: 1 } }, 
    { new: true, upsert: true });
    res.json({ count: document.count });
});

app.post('/api/decrement', async (req, res) => {
    const document = await Counter.findByIdAndUpdate('mainCounter', 
    { $inc: { count: -1 } }, 
    { new: true, upsert: true });
    res.json({ count: document.count });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//let count = 0;

// function saveCountToFile() {
//     fs.writeFileSync('count.txt', count.toString());
// }

// function loadCountFromFile() {
//     try {
//         count = parseInt(fs.readFileSync('count.txt', 'utf-8'));
//     } catch (error) {
//         if (error.code === 'ENOENT') {
//             console.log('count.txt does not exist. Initializing count to 0.');
//             count = 0;
//         } else {
//             console.log('Error reading count from file:', error);
//             count = 0;
//         }
//     }
// }

// app.get('/api/count', (req, res) => {
//     res.json({ count });
// });

// app.post('/api/increment', (req, res) => {
//     count++;
//     saveCountToFile();
//     res.json({ count });
// });

// app.post('/api/decrement', (req, res) => {
//     count--;
//     saveCountToFile();
//     res.json({ count });
// });

// loadCountFromFile();

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
