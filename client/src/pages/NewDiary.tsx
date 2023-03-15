import styled from "styled-components";
import { useState, useEffect,useRef } from "react";
import QuillEditor from "../components/NewDiary/QuillEditor";


const NewDiaryContainer = styled.form`
  padding: 15px;
  .dti {
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
  .DiaryBody{
    margin-top: 10px;
  }
  .ck-toolbar {
    width: 100.8%;
    
  }
  .ck-editor__editable {
    min-height: 300px;
    width: 99%;
    
  }
  .apl{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aplbtn{
    border-radius: 30px;
    width: 130px;
    height: 40px;
    margin-bottom: 5px;
  }
  .pl{
    border: 1px solid black;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    height: 100px;
  }
  .register{
    margin-top: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cancel{
    border-radius: 5px;
    width: 150px;
    height: 50px;
    margin-left: 15px;
  }
  .registration{
    border-radius: 5px;
    width: 150px;
    height: 50px;
    margin-right: 15px;
  }
  .quill-editor-container {
 margin-top: 10px;
}
`;
//유튜브 API 잘 쓰게 되면 프로젝트 목적에 맞게 아래 주소 수정해야됨. (add play list 에 들어가도록)
function openPopup() {
  window.open('https://www.youtube.com/results?search_query=음악', '유튜브 음악 검색', 'width=800, height=600');
}
export default function NewDiary(): JSX.Element {
  // const handleSubmit = async (e) => {
  //    여기다가 정보 담아서 서버로 넣어줘야할것들 정해줘야됨 
  // };
  const [body, setBody] = useState<string>(localStorage.getItem("body") || "");
  const [title, setTitle] = useState<string>('');
  const quillRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    localStorage.setItem("body", htmlContent);
  }, [htmlContent]);
  return (
    //onSubmit={handleSubmit} 등록버튼 누르면 정보 보내게끔 뉴 다이어리 css에 적어줘야됨
    <NewDiaryContainer >
      <div className='DiaryTitle'>
        <h3>제목</h3>
      </div>
      <div>
        <input
          className='dti' //diary title input
          type={'text'}
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
        ></input>
      </div>
      <div className='DiaryBody'>
        <h3>내용</h3>
      </div>
      <QuillEditor 
      className='quill-editor-container'
        quillRef={quillRef}
        htmlContent={htmlContent}
        setHtmlContent={setHtmlContent}
      />
      <div className='apl'>
        {/* addplaylist button */}
        <button className='aplbtn' onClick={()=> openPopup()}> 
          플레이 리스트에 추가
        </button>
      </div>
      <div className='pl'>플레이 리스트 들어가는곳 (스포티파이 API로 불러와야됨)</div>
      <div className='register'>
        {/* addplaylist button */}
        <button className='registration'> 
          취소
        </button>
        <button className='cancel'> 
          등록
        </button>
      </div>
    </NewDiaryContainer>
  );
}