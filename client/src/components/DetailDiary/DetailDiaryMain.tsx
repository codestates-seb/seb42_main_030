import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailDiaryList from "./DetailDiaryList";

export interface IDiaryData {
  id: number;
  nickname: string;
  title: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
  viewcount: number;
  tag: string[];
  like: number;
  comment: object[];
}

function DetailDiaryMain() {
  const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  const [likeData, setLikeData] = useState<IDiaryData[]>([]);
  const { id } = useParams();

  // 선택한 다이어리 get 요청
  const getDetailData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/diary?id=${id}`);
      setDetailData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

  // 내가 좋아요 누른 다이어리 get 요청
  const getLikeData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/likediary`);
      setLikeData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLikeData();
  }, []);

  return (
    <ul>
      {detailData.map((value) => {
        return (
          <DetailDiaryList
            list={value}
            getDetailData={getDetailData}
            getLikeData={getLikeData}
            key={value.id}
          />
        );
      })}
    </ul>
  );
}

export default DetailDiaryMain;
