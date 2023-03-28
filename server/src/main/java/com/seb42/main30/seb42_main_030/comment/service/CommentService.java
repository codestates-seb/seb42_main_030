package com.seb42.main30.seb42_main_030.comment.service;


import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.comment.repository.CommentRepository;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private UserService userService;

    public Comment createComment (Comment comment) {
        findExistComment(comment.getCommentId());


        long userId = userService.getLoginUser().getUserId();
        User user = getUserFromId(userId);
        comment.setUser(user);
        return commentRepository.save(comment);
    }
    //    read
    private User getUserFromId(long userId) {return userRepository.findById(userId).get(); }

    @Transactional(readOnly = true)
    public Comment readComment(long commentId) { return verifyComment(commentId); }

    public List<Comment> readComments() { return commentRepository.findAll(); }

    //    update
    @Transactional(propagation = Propagation.REQUIRED)
    public Comment updateComment (long commentId, Comment comment) {
        Comment verifyComment = verifyWriter(commentId);
        verifyComment.setBody(comment.getBody());

        return commentRepository.save(comment);
    }

    //    delete
    public void deleteComment (long commentId) {

        Comment verifyComment = verifyWriter(commentId);
        commentRepository.deleteById(verifyComment.getCommentId());

    }


    //    ID 값의 댓글이 없으면 오류
    @Transactional(readOnly = true)
    private Comment verifyComment (long commentId){

        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        return optionalComment.orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_FOUND) );

    }


    private void findExistComment (long commentId) {

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            throw new BusinessException(ExceptionCode.COMMENT_EXIST);
        }
    }

    private Comment verifyWriter (long commentId) {

        long userId = userService.getLoginUser().getUserId();
        Comment comment = verifyComment(commentId);
        if (comment.getUser().getUserId() != userId) {
            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
        }
        return comment;
    }

}
