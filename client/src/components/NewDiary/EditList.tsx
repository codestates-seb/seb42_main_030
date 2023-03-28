import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { BASE_API } from "../../util/API";

function EditList({ list }: DiaryDataProps) {
  const [title, setTitle] = useState<string>(list.title);
  const [body, setBody] = useState<string>(list.body);

  const navigate = useNavigate();
  const { diaryId } = useParams();

  const token = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZGRhZHpAbmF2ZXIuY29tIiwic3ViIjoiZGRhZHpAbmF2ZXIuY29tIiwiaWF0IjoxNjc5OTE3ODI3LCJleHAiOjE2ODA1MTc4Mjd9.InKMqa_ozFhKP-TNbUceA2nk3f9uPY5umYFxadKn-4uGgf4tW3nfbBDrK3nVXYLhu00ie1BExiJpeDCrFgX2RQ`;

  // 다이어리 patch 요청
  const submitHandler = async () => {
    const newDiary = {
      title: title,
      body: body,
    };
    await BASE_API.patch(`/diary/${diaryId}`, newDiary, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate(`/DetailDiary/${diaryId}`);
  };

  // 제목 작성 체인지 이벤트
  const changeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  // 본문 작성 체인지 이벤트
  const changeBody = (e: any) => {
    setBody(e.target.value);
  };

  return (
    <>
      <div>
        <span>다이어리 제목</span>
        <input type='text' onChange={changeTitle} value={title} />
      </div>
      <div>
        <span>다이어리 소개</span>
        <input type='text' onChange={changeBody} value={body} />
      </div>
      <button onClick={submitHandler}>등록</button>
    </>
  );
}

export default EditList;
