const express = require("express");
const app = express();
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const connect = require("./schemas/index");
connect();


app.get("/", (req, res) => {
    // api 사용 방법 설명 띄우기
    res.send("로컬 3001번 연결 완료 !");
});

app.use(express.json());
app.use([postsRouter, commentsRouter]);

app.listen(3000, () => {
    console.log("서버 연결 success");
});
