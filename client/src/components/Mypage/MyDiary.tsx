import * as DiaryList from "../Main/DiaryList";
import { useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext } from "react";
import { myContext } from "../../theme";

function MyDiary({ list }: DiaryDataProps) {
  const { currentUser }: any = useContext(myContext);
  const myDiary: boolean = list.userNickname === currentUser.nickname;

  const navigate = useNavigate();

  // 디테일 페이지로 이동
  const clickHandler = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <>
      {myDiary === true ? (
        <DiaryList.DiaryListContainer onClick={clickHandler}>
          <DiaryList.Thumbnail></DiaryList.Thumbnail>
          <DiaryList.InfoArea>
            <div className='infoTitle'>{list.title}</div>
            <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
            {/* <DiaryList.Tag>
          {list.tag.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </DiaryList.Tag> */}
          </DiaryList.InfoArea>
          <DiaryList.UserArea>
            <DiaryList.ByUsername>
              <DiaryList.Profile />
              <div className='by'>by</div>
              {list.userNickname}
            </DiaryList.ByUsername>
            <DiaryList.LikeAndComment>
              <AiFillHeart className='likeIcon' size={16} />
              {list.likeCount}
              <FaRegCommentDots className='commentIcon' size={15} />
              {list.comments.length}
            </DiaryList.LikeAndComment>
          </DiaryList.UserArea>
        </DiaryList.DiaryListContainer>
      ) : null}
    </>
  );
}

export default MyDiary;
