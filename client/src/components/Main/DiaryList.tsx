import styled from "styled-components";
import { IDiaryData } from "./DiaryMain";

const DiaryListContainer = styled.li`
  background-color: skyblue;
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

interface IDiaryProps {
  list: IDiaryData;
}

function DiaryList({ list }: IDiaryProps) {
  return (
    <DiaryListContainer>
      <Thumbnail>앨범 썸네일 이미지</Thumbnail>
      <div>{list.title}</div>
      <div>donggu</div>
      <div>2023.03.14</div>
    </DiaryListContainer>
  );
}

export default DiaryList;
