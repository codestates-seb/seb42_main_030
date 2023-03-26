import styled from "styled-components";
import { useState } from "react";
import { CommentData } from "../../util/Type";
import { BASE_API } from "../../util/API";

const CommentListContainer = styled.li`
  display: flex;
  justify-content: center;
`;

const CommentListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
  border-bottom: 1px solid lightgray;

  > .content {
    font-size: 13px;
    color: #323232;
    font-weight: 500;
  }

  > .date {
    font-size: 12px;
    color: #848180;
    margin: 10px 0 15px 0;
  }

  > .editCommentArea {
    width: 100%;
    padding: 5px;
  }
`;

const NameArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .name {
    font-size: 14px;
    font-weight: 500;
    margin: 15px 0 15px 0;
  }
`;

const ButtonArea = styled.div`
  display: flex;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    padding: 5px;
    background-color: transparent;
  }

  > .edit {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }
`;

interface CommentDataProps {
  list: CommentData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
}

function CommentList({ list, getDetailData }: CommentDataProps) {
  const [commentContent, setCommentContent] = useState(list.body);
  const [click, setClick] = useState(false);

  const token = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZ2dAZ21haWwuY29tIiwic3ViIjoiZ2dAZ21haWwuY29tIiwiaWF0IjoxNjc5NzI2NTU2LCJleHAiOjE2ODAzMjY1NTZ9.y2-PjQUPjcGsD5YQtU8ezxrh_bPEPGXe3YzJiXo-P_sNzDsS6w5IfVLaVjWyWw7ekubLVLchJIv6623bheoybQ`;

  // 댓글 patch 요청
  const changeComment = async () => {
    const newComment = {
      diaryId: list.diaryId,
      commentId: list.commentId,
      body: commentContent,
    };
    const res = await BASE_API.patch(`/comment/${list.commentId}`, newComment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getDetailData(res.data);
    setClick(false);
  };

  // 댓글  delete 요청
  const commentDelete = async () => {
    const res = await BASE_API.delete(`/diary/${list.commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getDetailData(res.data);
    console.log(list.commentId);
  };

  // 댓글 변경 클릭 이벤트
  const clickHandler = () => {
    setClick(!click);
  };

  // 댓글 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <CommentListContainer>
      <CommentListWrapper>
        <NameArea>
          <div className='name'>{list.userNickname}</div>
          <ButtonArea>
            {click ? (
              <button className='edit' onClick={changeComment}>
                저장
              </button>
            ) : (
              <button className='edit' onClick={clickHandler}>
                수정
              </button>
            )}
            <button className='delete' onClick={commentDelete}>
              삭제
            </button>
          </ButtonArea>
        </NameArea>
        {click ? (
          <input
            className='editCommentArea'
            type='text'
            value={commentContent}
            onChange={onChangeEditInput}
          ></input>
        ) : (
          <div className='content'>{list.body}</div>
        )}
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentListWrapper>
    </CommentListContainer>
  );
}

export default CommentList;
