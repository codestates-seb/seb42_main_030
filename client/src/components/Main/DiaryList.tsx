import styled from "styled-components";
import { IDiaryData } from "./DiaryMain";

const DiaryListContainer = styled.li`
  border: 1px solid #d1d1d1;
  margin-bottom: 40px;
  width: 306px;
  height: 312px;
  list-style: none;
`;

const Thumbnail = styled.div`
  width: 306px;
  height: 180px;
  background-color: lightgray;
`;

const InfoArea = styled.div`
  padding: 16px 10px 16px 10px;

  > .infoTitle {
    font-weight: 500;
    color: #514e4d;
    margin-bottom: 10px;
  }

  > .infoName {
    margin-bottom: 5px;
  }

  > .infoName,
  .infoDate {
    font-size: 12px;
    font-weight: 500;
    color: #848180;
  }
`;

const UserArea = styled.div`
  border-top: 1px solid #d1d1d1;
`;

interface IDiaryProps {
  list: IDiaryData;
}

function DiaryList({ list }: IDiaryProps) {
  return (
    <DiaryListContainer>
      <Thumbnail>{list.title}</Thumbnail>
      <InfoArea>
        <div className='infoTitle'>보라빛 석양으로 물드는 회색 도시 속으로</div>
        <div className='infoName'>donggu</div>
        <div className='infoDate'>2023.03.14</div>
      </InfoArea>
      <UserArea>fd</UserArea>
    </DiaryListContainer>
  );
}

export default DiaryList;
