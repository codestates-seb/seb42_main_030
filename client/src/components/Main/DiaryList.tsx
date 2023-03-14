import styled from "styled-components";
import { IDiaryData } from "./DiaryMain";

const DiaryListContainer = styled.li`
  background-color: skyblue;
  margin-bottom: 40px;
  width: 310px;
  height: 310px;
  list-style: none;
`;

interface IDiaryProps {
  list: IDiaryData;
}

function DiaryList({ list }: IDiaryProps) {
  return (
    <DiaryListContainer>
      <div>{list.title}</div>
      <div>{list.body}</div>
      <div>{list.like}</div>
    </DiaryListContainer>
  );
}

export default DiaryList;
