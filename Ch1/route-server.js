const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'text/html');
    
    if(path in urlMap){
        urlMap[path](req, res);
    } else {
        notFound(req, res);
    }
})
.listen(3000, () => console.log("라우터를 만들어보자"));

const user = (req, res) => {
    const query = url.parse(req.url, true).query;
    res.end(`[user] name : ${query.name}, age : ${query.age}`);
}

const feed = (req, res) => {
    res.end(
        `<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `
    );
}

const urlMap = {
    "/" : (req, res) => {res.end("Welcome to my homepage");},
    "/user": user,
    "/feed": feed,
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 Not Found");
}