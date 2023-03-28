import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { DiaryData } from '../../util/Type';
import { BASE_API } from '../../util/API';
import EditList from './EditList';

export default function EditMain() {
  const [detailData, setDetailData] = useState<DiaryData>();
  const { diaryId } = useParams();

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
  return (
    <>
      {
        detailData && <EditList list={detailData} />
      }
    </>
  )
}
