import styled from "styled-components";
import { CommentDataProps } from "../../util/Type";
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

  > .name {
    font-size: 14px;
    font-weight: 500;
    margin: 15px 0 15px 0;
  }

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

function MyComment({ list }: CommentDataProps) {
  const { currentUser }: any = useContext(myContext);
  const myComment: boolean = list.userNickname === currentUser.nickname;

  return (
    <>
      {myComment === true ? (
        <CommentListContainer>
          <CommentListWrapper>
            <div className='name'>{list.userNickname}</div>
            <div className='content'>{list.body}</div>
            <div className='date'>{list.createdAt.substring(0, 10)}</div>
          </CommentListWrapper>
        </CommentListContainer>
      ) : null}
    </>
  );
}

export default MyComment;
