import * as DiaryList from "../Main/DiaryList";
import { useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

function MyLikeDiary({ list }: DiaryDataProps) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <DiaryList.DiaryListContainer onClick={clickHandler}>
      <DiaryList.Thumbnail>썸네일 이미지</DiaryList.Thumbnail>
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
  );
}

export default MyLikeDiary;
