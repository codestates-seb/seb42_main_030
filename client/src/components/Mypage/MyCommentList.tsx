import Test from "./Test";
import { IMyDiaryData } from "./MypageMain";

interface IMyDiaryDataProps {
  list: IMyDiaryData;
}

function MyCommentList({ list }: IMyDiaryDataProps) {
  return (
    <ul>
      {list.comment.map((value) => {
        return <Test list={value} key={value.comment_id} />;
      })}
    </ul>
  );
}

export default MyCommentList;
