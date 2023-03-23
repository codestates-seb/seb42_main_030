import styled from "styled-components";
import { IDiaryData } from "./DetailDiaryMain";
import { useState } from "react";
import axios from "axios";

const LikeButton = styled.button`
  width: 100px;
  height: 50px;
`;

const Like = styled.div`
  border: 2px solid red;
`;

const UnLike = styled.div`
  border: none;
`;

interface IDiaryDataProps {
  list: IDiaryData;
  getDetailData: any;
  getLikeData: any;
}

function DetailDiaryList({
  list,
  getDetailData,
  getLikeData,
}: IDiaryDataProps) {
  const [checkLike, setCheckLike] = useState<boolean>(false);

  const plusLikeCount = async (id: number) => {
    // 좋아요를 아직 누르지 않았다면 좋아요 카운트를 1 증가 시키고,
    if (checkLike === false) {
      const newNickname = {
        like: list.like + 1,
      };
      const res = await axios.patch(
        `http://localhost:3001/diary/${id}`,
        newNickname
      );
      getDetailData(res.data);
      setCheckLike(true);
      // 좋아요를 누른 해당 다이어리를 좋아요 다이어리를 모아두는 테이블로 post 한다.
      const likeDiary = {
        id: list.id,
        nickname: list.nickname,
        title: list.title,
        body: list.body,
        createdAt: list.createdAt,
        modifiedAt: list.modifiedAt,
        viewcount: list.viewcount,
        tag: list.tag,
        like: list.like,
        comment: list.comment,
      };
      const resDiary = await axios.post(
        `http://localhost:3001/likediary`,
        likeDiary
      );
      getLikeData(resDiary.data);
      // 좋아요를 이미 눌렀다면 좋아요 카운트를 1 감소 시키고,
    } else {
      const newNickname = {
        like: list.like - 1,
      };
      const res = await axios.patch(
        `http://localhost:3001/diary/${id}`,
        newNickname
      );
      getDetailData(res.data);
      setCheckLike(false);
      // 좋아요를 취소한 해당 다이어리를 좋아요 다이어리를 모아두는 테이블에서 delete 한다.
      const resDiary = await axios.delete(
        `http://localhost:3001/likediary/${id}`
      );
      getLikeData(resDiary.data);
    }
  };

  return (
    <>
      {list.title}
      {list.body}
      <LikeButton
        onClick={() => {
          plusLikeCount(list.id);
        }}
      >
        {checkLike === true ? (
          <Like>{list.like}</Like>
        ) : (
          <UnLike>{list.like}</UnLike>
        )}
      </LikeButton>
    </>
  );
}

export default DetailDiaryList;
