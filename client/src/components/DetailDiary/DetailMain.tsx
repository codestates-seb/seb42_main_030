// import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import DetailList from "./DetailList";
import EditDetail from '../EditDiary/EditList';

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();
  const [show, setShow] = useState(true)
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

  return <>
    {detailData && <DetailList list={detailData} getDetailData={getDetailData} />};
    {/* {detailData && <EditDetail list={detailData} />} */}
  </>;
}

export default DetailMain;
