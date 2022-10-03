const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts");


// 전체 게시글 조회
router.get("/posts", async (req, res) => {
    try {
        const postsAll = await Posts.find().sort({createdAt: -1}); // 내림차순으로 최신순으로 정렬
        const [...posts] = postsAll.map((post) => {
            return {
                _id      : post._id,
                title    : post.title,
                user     : post.user,
                createdAt: post.createdAt
            };
        });
        res.json(posts);
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
});


// 게시글 작성
router.post("/posts", async (req, res) => {
    try {
        const {title, user, password, content} = req.body;
        const createdAt = new Date().toLocaleString(); // 날짜는 서버에서 실시간 날짜 받아와서 넣어주기
        await Posts.create({
            title    : title,
            user     : user,
            password : password,
            content  : content,
            createdAt: createdAt
        });
        res.send("posting success !");
    } catch (err) {
        res.json({success: false, errorMessage: err});
    }
    ;
});


// 게시글 상세조회
// db에서 주는 post의 _id 값으로 특정 게시글 조회.
router.get("/posts/:_id", async (req, res) => {
    try {
        const postId = req.params._id; //params가 {_id : path의 _id 부분 값} 객체로 전달.
        const userPost = await Posts.findOne({postId})
            .select("_id title user createdAt content"); // 밑에 주석처리된 res.json이랑 같은 의미.
        res.json(userPost);

        // res.json({
        //     title    : userPost.title,
        //     user     : userPost.user,
        //     createdAt: userPost.createdAt,
        //     content  : userPost.content
        // });
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
});


//게시글 삭제
// params 게시글 _id 를 받고 body에서 password를 받아서 특정 게시글 삭제.
router.delete("/posts/:_id", async (req, res) => {
    try {
        const {postId} = req.params;
        const {password} = req.body;
        const post = await Posts.findOne({postId}); // validation 단계
        if (post.password === password) { // 입력한 패스워드랑 post에 저장된 패스워드랑 비교 후 삭제.
            await Posts.deleteOne({postId});
            res.send("삭제 완료 !");
        } else {
            res.send("user 값이랑 password 를 다시 확인해주세요."); //post는 있지만 body에서 parser된 값이 다를 때 출력.
        }
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
});

// 게시글 수정
router.put("/posts/:_id", async (req, res) => {
    try {
        const {postId} = req.params;
        const updatePost = req.body;
        const post = await Posts.findOne({postId}); //수정할 게시글이 존재하는지 확인
        if (post.password === updatePost.password) {
            await Posts.updateOne({postId}, {$set: {content: updatePost.content}});
            res.send("수정 완료 !");
        } else {
            res.send("password 를 다시 확인해주세요.");
        }
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }

});

module.exports = router;