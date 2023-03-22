import MyCommentList from "./MyCommentList";
import { IMyDiaryData } from "../MypageMain";

interface IMyDiaryDataProps {
  list: IMyDiaryData;
}

function MyCommentProps({ list }: IMyDiaryDataProps) {
  return (
    <>
      {list.comment.map((value) => {
        return <MyCommentList list={value} key={value.id} />;
      })}
    </>
  );
}

export default MyCommentProps;
