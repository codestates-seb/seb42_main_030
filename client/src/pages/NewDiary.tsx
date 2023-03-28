import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import QuillEditor from "../components/NewDiary/QuillEditor";
import SpotifyWebApi from "spotify-web-api-js";
import LoginHeader from "../components/LoginHeader";
import axios from "axios";

const NewDiaryContainer = styled.form`
  margin: 5px;
  padding: 15px;
  border: 1px solid;
  .dti {
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
  .DiaryBody {
    margin-top: 10px;
  }
  .ck-toolbar {
    width: 100.8%;
  }
  .ck-editor__editable {
    min-height: 300px;
    width: 99%;
  }
  .apl {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aplbtn {
    border-radius: 30px;
    width: 130px;
    height: 40px;
    margin-bottom: 5px;
  }
  .pl {
    border: 1px solid black;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    height: 100px;
  }
  .register {
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cancel {
    border-radius: 5px;
    width: 150px;
    height: 50px;
    margin-right: 15px;
  }
  .registration {
    border-radius: 5px;
    width: 150px;
    height: 50px;
    margin-left: 15px;
  }
  .quill-editor-container {
    margin-top: 10px;
  }
`;

const spotifyApi = new SpotifyWebApi();
// 액세스 토큰 설정
spotifyApi.setAccessToken("YOUR_ACCESS_TOKEN");
interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  uri: string;
}
// type SearchResult = Track[];

// interface SearchResult {
//   id: string;
//   name: string;
//   artists: {
//     name: string;
//   }[];
//   album: {
//     name: string;
//   };
//   uri: string;
// };
interface SearchResult {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  uri: string;
}
//스포티파이 음악 검색 함수 만들어야됨
async function searchMusic(
  query: string,
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
) {
  try {
    const response = await spotifyApi.search(query, ["track"], { limit: 10 });
    console.log(response);
    // 음악 정보를 처리하려면 여기에 코드를 추가.
    const tracks: SearchResult[] =
      response?.tracks?.items?.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => ({
          name: artist.name,
        })),
        album: {
          name: track.album.name,
        },
        uri: track.uri,
      })) ?? [];
    setSearchResults(tracks);
  } catch (error) {
    console.error("Spotify 검색 중 오류 발생:", error);
  }
}
export default function NewDiary(): JSX.Element {
  const [body, setBody] = useState<string>(localStorage.getItem("body") || "");
  const [title, setTitle] = useState<string>("");
  const quillRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    localStorage.setItem("body", htmlContent);
  }, [htmlContent]);

  const handleSubmit = async () => {
    const diaryData = {
      diary_Id: 1,
      title: "테스트",
      body: "테스트",
      playList_id: 0,
      like: 0,
      tag: "",
      createdAt: "2023-02-28T18:35:00",
      modifiedAt: "2023-02-28T18:35:00",
      user_id: "테스트",
      comments: [],
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/diary`,
        diaryData
      );
      console.log("등록 완료:", response.data);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  const searchMusic = async (
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
  ) => {
    const features =
      "width=500,height=500,resizable=yes,scrollbars=yes,status=yes";
    const popup = window.open("", "", features);

    const input = document.createElement("input");
    input.placeholder = "검색어를 입력하세요";
    popup?.document.body.appendChild(input);

    const button = document.createElement("button");
    button.innerText = "검색";
    button.addEventListener("click", async () => {
      const query = input.value;
      const response = await spotifyApi.search(query, ["track"], { limit: 10 });

      // 검색 결과 처리
      const tracks: SearchResult[] =
        response?.tracks?.items?.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => ({
            name: artist.name,
          })),
          album: {
            name: track.album.name,
          },
          uri: track.uri,
        })) ?? [];
      setSearchResults(tracks);

      popup?.close();
    });
    popup?.document.body.appendChild(button);
  };
  return (
    // 등록버튼 누르면 정보 보내게끔 뉴 다이어리 css에 적어줘야됨
    <NewDiaryContainer onSubmit={handleSubmit}>
      {/* <LoginHeader/> */}
      <div className='DiaryTitle'>
        <h3>제목</h3>
      </div>
      <div>
        <input
          className='dti' //diary title input
          type={"text"}
          placeholder='제목을 입력해 주세요'
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
        <button
          className='aplbtn'
          onClick={() => searchMusic(setSearchResults)}
        >
          플레이 리스트에 추가
        </button>
      </div>
      <div className='pl'>
        플레이 리스트 들어가는곳 (스포티파이 API로 불러와야됨)
      </div>
      <div className='register'>
        {/* addplaylist button */}
        <button className='cancel'>취소</button>
        <button className='registration' type='submit'>
          등록.
        </button>
      </div>
    </NewDiaryContainer>
  );
}
