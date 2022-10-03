const express = require("express");
const app = express();
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const connect = require("./schemas/index");
connect();


app.get("/", (req, res) => {
    // api 사용 방법 설명 띄우기
    res.json({
        "게시글 조회" : "/posts",
        "게시글 작성" : "title, user, password, content -> body에 객체로 입력",
        "게시글 수정" : "/posts/:_id -> _id는 db에 저장될 때 부여되는 유니크값으로 넣고 body에 password, content 입력",
        "특정글 조회" : "/posts/:_id -> 위와 같은 id 값
        "특정글 삭제" : "/posts/:_id -> 위와 같은 id 값, body 에 password",
        "댓글 조회" : "/comments/:_postId -> 위와 같은 post의 id 값으로 같은 게시글에 달린 댓글들 전부 조회",
        "댓글 작성" : "/comments/:_postId -> 위와 같은 post의 id 값으로 특정 게시글에 댓글 달기, body 에 user, comment 입력",
        "댓글 수정" : "/comments/:_id -> comment의 유니크값 id로 조회, body에 comment 입력",
        "댓글 삭제" : "/comments/:_id -> comment의 유니크값 id로 조회, 찾아서 삭제"
        );
});

app.use(express.json());
app.use([postsRouter, commentsRouter]);

app.listen(3000, () => {
    console.log("서버 연결 success");
});
