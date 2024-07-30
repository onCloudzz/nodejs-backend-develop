const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Person = require('./person-model');

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.listen(3000, async () => {
    console.log("Server started");
    const mongodbUri = "mongodb+srv://onCloud:Pinbol0315@cluster0.63loqzc.mongodb.net/";
    mongoose.connect(mongodbUri).then(console.log("Connected to MongoDB"));
});

app.get('/person', async (req, res) => {
    const persons = await Person.find({});
    res.json(persons);
});

app.get('/person/:email', async (req, res) => {
    const person = await Person.find({ email: req.params.email });
    res.send(person);
});

app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});

app.delete("/person/:email", async (req, res) => {
    await Person.findOneAndDelete({ email: req.params.email });
    res.send({ success: true });
});
