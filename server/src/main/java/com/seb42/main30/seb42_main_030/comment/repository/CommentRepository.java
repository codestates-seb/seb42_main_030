package com.seb42.main30.seb42_main_030.comment.repository;

import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository <Comment, Long> {
}
