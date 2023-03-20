import styled from "styled-components";
import { ICommentData } from "./MypageMain";

const DiaryListContainer = styled.li`
  list-style: none;
`;

interface IMyDiaryDataProps {
  list: ICommentData;
}

function Test({ list }: IMyDiaryDataProps) {
  const myComment: boolean = list.nickname === "donggu";

  return (
    <>
      {myComment === true ? (
        <DiaryListContainer>
          {list.nickname}
          {list.body}
        </DiaryListContainer>
      ) : null}
    </>
  );
}

export default Test;
