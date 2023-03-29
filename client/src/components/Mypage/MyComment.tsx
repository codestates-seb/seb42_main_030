import styled from "styled-components";
import { CommentDataProps } from "../../util/Type";

const CommentListContainer = styled.li`
  display: flex;
  justify-content: center;
`;

const CommentListWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  border: none;
  border-bottom: 1px solid lightgray;

  > .name {
    font-size: 14px;
    font-weight: 500;
    margin: 15px 0 15px 0;
  }
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
`;

function MyComment({ list }: CommentDataProps) {
  // const isLogin = localStorage.getItem('nickname')
  // list.userNickname === {이 부분을 로그인한 사용자의 닉네임으로 변경}
  const myComment: boolean = list.userNickname === "kevin";

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
