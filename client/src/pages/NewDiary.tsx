import styled from "styled-components";
import { useState, useEffect,useRef } from "react";
import QuillEditor from "../components/NewDiary/QuillEditor";
import SpotifyWebApi from "spotify-web-api-js";
import LoginHeader from "../components/LoginHeader";

const NewDiaryContainer = styled.form`
  padding: 15px;
  border: 1px solid;
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


const spotifyApi = new SpotifyWebApi();

// 액세스 토큰 설정
spotifyApi.setAccessToken("YOUR_ACCESS_TOKEN");

//스포티파이 음악 검색 함수 만들어야됨
async function searchMusic(query : string) {
  try {
    const response = await spotifyApi.search(query, ['track'], { limit: 10 });
    console.log(response);
    // 음악 정보를 처리하려면 여기에 코드를 추가하세요.
  } catch (error) {
    console.error('Spotify 검색 중 오류 발생:', error);
  }
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
       <LoginHeader/>
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
        <button className='aplbtn' onClick={()=> searchMusic("검색어")}> 
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