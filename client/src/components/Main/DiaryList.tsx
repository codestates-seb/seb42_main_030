import styled from "styled-components";
import { IDiaryData } from "./DiaryMain";

const DiaryListContainer = styled.li`
  border: 1px solid #d1d1d1;
  width: 310px;
  height: 339px;
  list-style: none;
`;

const Thumbnail = styled.div`
  width: 310px;
  height: 184px;
  background-color: lightgray;
`;

const InfoArea = styled.div`
  padding: 15px 10px 15px 10px;

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

const Tag = styled.ul`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: #757170;
  list-style: none;

  > li {
    margin-right: 5px;
    padding: 2px 5px 2px 5px;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
  }
`;

const UserArea = styled.div`
  display: flex;
  padding: 7px 10px 0 10px;
  border-top: 1px solid #d1d1d1;
`;

const Profile = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  background-color: #ffe575;
  border-radius: 50%;
  position: relative;
`;

const ByUsername = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #21252b;

  > .by {
    font-size: 12px;
    color: gray;
    margin-right: 5px;
  }
`;

interface IDiaryDataProps {
  list: IDiaryData;
}

function DiaryList({ list }: IDiaryDataProps) {
  return (
    <DiaryListContainer>
      <Thumbnail>썸네일 이미지</Thumbnail>
      <InfoArea>
        <div className='infoTitle'>{list.title}</div>
        <div className='infoDate'>{list.createdAt}</div>
        <Tag>
          {list.tag.map((value, index) => {
            return <li key={index}>#{value}</li>;
          })}
        </Tag>
      </InfoArea>
      <UserArea>
        <Profile />
        <ByUsername>
          <div className='by'>by</div>
          {list.nickname}
        </ByUsername>
      </UserArea>
    </DiaryListContainer>
  );
}

export default DiaryList;
