const url = require('url');
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {console.log("HELLo");});

app.get("/", (_, res) => res.end("Welcome to my homepage"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const query = url.parse(req.url, true).query;
    res.end(`[user] name : ${query.name}, age : ${query.age}`);
}

function feed(req, res) {
    res.end(
        `<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `
    );
}