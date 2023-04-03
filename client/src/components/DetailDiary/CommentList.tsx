import styled from "styled-components";
import { useState } from "react";
import { CommentData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { useContext } from "react";
import { myContext } from "../../theme";

const CommentListContainer = styled.li`
  display: flex;
  justify-content: center;
`;

const CommentListWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.detailLine};
  color: ${(props) => props.theme.mainText};

  > .content {
    font-size: 13px;
    color: ${(props) => props.theme.mainText};
    font-weight: 500;
  }

  > .date {
    font-size: 12px;
    color: #848180;
    margin: 10px 0 15px 0;
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

const EditCommentArea = styled.input`
  color: ${(props) => props.theme.mainText};
  width: 100%;
  padding: 10px 8px 10px 8px;
  border: none;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};

  &:focus {
    outline: none;
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
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }
`;

const DeleteModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const DeleteModalView = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: white;
  width: 430px;
  height: 220px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 50.5px;
  }

  > button {
    font-weight: 500;
    width: 215px;
    height: 50px;
    color: white;
    border: none;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  > .deleteCancelButton {
    color: #21252b;
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid #eeeeee;
    border-right: 0.5px solid #eeeeee;
    border-bottom-left-radius: 5px;

    &:hover {
      background-color: #eeeeee;
    }
  }

  > .deleteButton {
    color: #ec1d36;
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid #eeeeee;
    border-left: 0.5px solid #eeeeee;
    border-bottom-right-radius: 5px;

    &:hover {
      background-color: #eeeeee;
    }
  }
`;

interface CommentDataProps {
  list: CommentData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
}

function CommentList({ list, getDetailData }: CommentDataProps) {
  const [commentContent, setCommentContent] = useState(list.body);
  const [click, setClick] = useState<boolean>(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState<boolean>(false);

  const { currentUser }: any = useContext(myContext);
  const myComment: boolean = list.userNickname === currentUser?.nickname;

  // 댓글 patch 요청
  const changeComment = async () => {
    const newComment = {
      diaryId: list.diaryId,
      commentId: list.commentId,
      body: commentContent,
    };
    const res = await TOKEN_API.patch(`/comment/${list.commentId}`, newComment);
    getDetailData(res.data);
    setClick(false);
  };

  // 댓글 delete 요청
  const commentDelete = async () => {
    const res = await TOKEN_API.delete(`/comment/${list.commentId}`);
    getDetailData(res.data);
  };

  // 댓글 변경 클릭 이벤트
  const clickHandler = () => {
    setClick(!click);
  };

  // 댓글 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  // 댓글 운영 원칙 오픈 모달 오픈 이벤트 핸들러
  const openDeleteCommentModalHandler = () => {
    setDeleteCommentModal(!deleteCommentModal);
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  };

  // 댓글 운영 원칙 모달 클로즈 이벤트 핸들러
  const closeDeleteModalHandler = () => {
    setDeleteCommentModal(!deleteCommentModal);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  return (
    <CommentListContainer>
      <CommentListWrapper>
        <NameArea>
          <div className='name'>{list.userNickname}</div>
          <ButtonArea>
            {myComment === true ? (
              <>
                {click ? (
                  <button className='edit' onClick={changeComment}>
                    저장
                  </button>
                ) : (
                  <button className='edit' onClick={clickHandler}>
                    수정
                  </button>
                )}
                <button className='delete' onClick={openDeleteCommentModalHandler}>
                  삭제
                </button>
              </>
            ) : null}
            {deleteCommentModal ? (
              <DeleteModalBack>
                <DeleteModalView>
                  <div className='deleteModalTitle'>댓글을 삭제 하시겠습니까?</div>
                  <div className='warningText'>삭제한 댓글은 복구되지 않습니다.</div>
                  <button className='deleteCancelButton' onClick={closeDeleteModalHandler}>
                    취소
                  </button>
                  <button
                    className='deleteButton'
                    onClick={() => {
                      commentDelete();
                      closeDeleteModalHandler();
                    }}
                  >
                    삭제
                  </button>
                </DeleteModalView>
              </DeleteModalBack>
            ) : null}
          </ButtonArea>
        </NameArea>
        {click ? (
          <EditCommentArea type='text' value={commentContent} onChange={onChangeEditInput} />
        ) : (
          <div className='content'>{list.body}</div>
        )}
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentListWrapper>
    </CommentListContainer>
  );
}

export default CommentList;
