const http = require('http'); // http 객체 생성

let count = 0;

//노드 서버 객체 생성
const server = http.createServer((req, res) => {
    console.log((count += 1));
    res.statusCode = 200; // 응답 상태 코드
    res.setHeader('Content-Type', 'text/plain'); // 응답 헤더 설정
    res.write('Hello Node.js!'); // 응답 본문 작성
    //prettier-ignore
    setTimeout(() => {
        res.end("end."); // 응답 전송
    }, 2000);
});

server.listen(8000, () => console.log("Hello Node.js"));