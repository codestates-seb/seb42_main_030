import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

const DiaryListContainer = styled.li`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  width: 310px;
  height: 339px;
  list-style: none;
  border-radius: 4px;
  &:hover {
    transform: scale(1.02);
    transition: 0.2s;
  }
`;

const Thumbnail = styled.div`
  width: 310px;
  height: 184px;
  background-color: lightgray;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const InfoArea = styled.div`
  padding: 15px;

  > .infoTitle {
    font-weight: 500;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .infoDate {
    font-size: 12px;
    font-weight: 500;
    color: #848180;
    margin-bottom: 15px;
  }
`;

// const Tag = styled.ul`
//   display: flex;
//   font-size: 12px;
//   font-weight: 500;
//   color: #757170;
//   list-style: none;

//   > li {
//     margin-right: 5px;
//     padding: 3px 6px 3px 6px;
//     border: 1px solid #d1d1d1;
//     border-radius: 50px;
//   }
// `;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px 8px 15px;
  border-top: 1px solid #d1d1d1;
`;

const Profile = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: lightgray;
`;

const ByUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  font-weight: 500;
  color: #21252b;

  > .by {
    font-size: 12px;
    color: gray;
    margin-right: 5px;
  }
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;

  > .likeIcon {
    color: red;
    margin-right: 5px;
  }

  > .commentIcon {
    margin: 0 5px 0 10px;
  }
`;

function DiaryList({ list }: DiaryDataProps) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
    // navigate(`/DetailDiary/${list.nickname}`)
  };

  return (
    <DiaryListContainer onClick={clickHandler}>
      <Thumbnail>썸네일 이미지</Thumbnail>
      <InfoArea>
        <div className='infoTitle'>{list.title}</div>
        <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
        {/* <Tag>
          {list.tag.map((value: string, index: number) => {
            return <li key={index}>{value}</li>;
          })}
        </Tag> */}
      </InfoArea>
      <UserArea>
        <ByUsername>
          <Profile />
          <div className='by'>by</div>
          {list.userNickname}
        </ByUsername>
        <LikeAndComment>
          <AiFillHeart className='likeIcon' size={16} />
          {list.likeCount}
          <FaRegCommentDots className='commentIcon' size={15} />
          {list.comments.length}
        </LikeAndComment>
      </UserArea>
    </DiaryListContainer>
  );
}

export default DiaryList;
