import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import axios from "axios";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();

  const { diaryId } = useParams();

  // 선택한 다이어리 get 요청
  const getDetailData = async () => {
    try {
      const res = await BASE_API.get(`/diary/${diaryId}`);
      setDetailData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

  //! json 서버 유튜브 링크 테스트 용
  const [test, setTest] = useState<any>();

  const getYoutubeData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/diary`);
      setTest(res.data[0].playlist);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getYoutubeData();
  }, []);

  // console.log(test);

  return (
    <>{detailData && <DetailList list={detailData} getDetailData={getDetailData} test={test} />};</>
  );
}

export default DetailMain;
