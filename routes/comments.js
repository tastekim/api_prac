const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comments");

// 특정 게시글의 comments 조회
router.get("/comments/:postId", async (req, res) => {
    try {
        const {postId} = req.params;
        const commentsAll = await Comments.find({postId}).sort({createdAt: -1});
        const [...comments] = commentsAll.map((comment) => {
            return {
                _id      : comment._id,
                user     : comment.user,
                comment  : comment.comment
            };
        });
        res.json(comments);
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
    ;
});
router.post("/comments/:postId", async (req, res) => {
    try {
        const {postId} = req.params;
        const {user, comment} = req.body;
        await Comments.create({
            postId   : postId,
            user     : user,
            comment  : comment
        });
        res.send("commenting success !");
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
    ;
});

router.put("/comments/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const commentPut = req.body;
        const comment = await Comments.findOne({_id}); //수정할 댓글이 존재하는지 확인
        if (commentPut.comment !== "") {
            await Comments.updateOne({_id}, {$set: {comment: commentPut.comment}});
            res.send("수정 완료 !");
        } else if (comment === null) {
            res.send("수정할 comment가 없습니다.");
        } else {
            res.send("내용을 입력해주세요.");
        }
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
});

router.delete("/comments/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const comment = await Comments.findOne({_id}); // validation 단계
        if (comment === null) {
            res.send("삭제할 comment 가 없습니다.");
        } else {
            await Comments.deleteOne({_id});
            res.send("삭제 완료 !");
        }
        ;
    } catch (err) {
        res.status(400).json({success: false, errorMessage: err});
    }
});

module.exports = router;
