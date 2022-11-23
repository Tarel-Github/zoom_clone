//app.js는 frontend를 담당한다. frontend와 backend 폴더를 분리함으로써 보안을 강화한다.
//server.js는 backend를 담당한다.

const express = require("express");
const http = require("http"); //http 방식
const WebSocket = require("ws");
const app = express();

//html 대신 pug를 통해서 사이트를 표현
app.set("view engine", "pug");

//pug들이 있는 경로를 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

//("/")경로에는 home이라는 pug파일을 보여준다. 보통 req, res로 작성하지만 여기선 req를 _라고 작성했다.
app.get("/", (_, res) => res.render("home"));

//없는 URL로 갈 경우 ("/") 링크로 돌아오게 하는 명령
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`━━━━Listening on http://localhost:3750`); //아래 내용 덕분에 ws://localhost:3750도 구동 된다.

const server = http.createServer(app); //http 서버
const wss = new WebSocket.Server({ server }); //ws 서버, http서버를 넣어서 같이 구동, http 서버가 필요 없다면 파라미터를 비울 것

//app.listen(3750, handleListen);
server.listen(3750, handleListen); //http 서버위에 ws서버도 담겼다.
