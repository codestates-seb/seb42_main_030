package com.seb42.main30.seb42_main_030.comment.controller;


import com.seb42.main30.seb42_main_030.comment.controller.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.comment.mapper.CommentMapper;
import com.seb42.main30.seb42_main_030.comment.service.CommentService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController (CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

// 답글 등록
    @PostMapping
    public ResponseEntity postComment (@Valid @RequestBody CommentDto.Post post) {

        Comment comment = commentService.createComment (mapper.commentPostToComment(post));
        CommentDto response = mapper.commentToCommentDto(comment);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

// 답글(각각) 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment (@PathVariable("comment-id") long commentId) throws BusinessException {
        try {
            Comment comment =commentService.readComment(commentId);
            CommentDto response = mapper.commentToCommentDto(comment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BusinessException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

//    답글 전체 조회
    @GetMapping
    public ResponseEntity getComment () {
        List<Comment> comments = commentService.readComments();
        List<CommentDto> responses = mapper.commentsToResponses(comments);
        return new ResponseEntity(responses, HttpStatus.OK);
    }


//    댓글 수정
    @PatchMapping
    public ResponseEntity patchComment (@PathVariable("comment-id") long commentId,
                                        @Valid @RequestBody CommentDto.Patch patch) throws BusinessException {
        try {
            Comment comment = commentService.updateComment(commentId, mapper.commentPatchToComment(patch));
            CommentDto response = mapper.commentToCommentDto(comment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

//    댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment (@PathVariable("comment-id") long commentId) throws BusinessException {
        try {
            commentService.deleteComment(commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
