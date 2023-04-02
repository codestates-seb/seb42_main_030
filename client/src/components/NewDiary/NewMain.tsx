import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_API } from "../../util/API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NewPlayList from "./NewPlayList";
import { myContext } from "../../theme";
import { PlaylistData } from "../../util/Type";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

export const TitleArea = styled.div`
  height: 90px;
  display: flex;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.detailLine};
  padding: 0 10px 0 10px;

  > .inputTitle {
    width: 580px;
    font-size: 24px;
    font-weight: 600;
    padding: 10px 8px 10px 8px;
    border-radius: 4px;
    color: ${(props) => props.theme.mainText};
    border: none;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }
`;

export const SubmitButton = styled.button`
  font-size: 13px;
  color: #1c1a16;
  font-weight: 700;
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

export const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;

  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    border-radius: 4px;
    background-color: lightgray;
  }
`;

export const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
`;

export const UserInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.mainText};

  > .text {
    font-size: 13px;
    margin-right: 50px;
  }
`;

export const AlbumInfoArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    color: ${(props) => props.theme.mainText};
    width: 100%;
    height: 200px;

    > .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.disabledTagBorder};
      background-color: ${(props) => props.theme.disabledTagBackground};
    }

    > .ql-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.disabledTagBorder};
      background-color: ${(props) => props.theme.disabledTagBackground};

      > .ql-editor::before {
        color: gray;
        font-style: normal;
      }
    }
  }
`;

export const PlayListArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }
`;

export const UrlInput = styled.div`
  display: flex;
  margin-bottom: 20px;

  > input {
    color: ${(props) => props.theme.mainText};
    width: 1300px;
    resize: none;
    margin-right: 10px;
    border-radius: 4px;
    padding: 10px 8px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    width: 90px;
    min-width: 90px;
    border: none;
    color: #21252b;
    border-radius: 4px;
    background-color: ${(props) => props.theme.mainColor};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.buttonHover};
    }
  }
`;

function NewMain() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [newPlayList, setNewPlayList] = useState<PlaylistData[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");

  const navigate = useNavigate();
  const { currentUser }: any = useContext(myContext);
  const today: string = new Date().toISOString().substring(0, 10);

  // 다이어리 post 요청
  const submitHandler = async () => {
    const newDiary = {
      title: newTitle,
      body: newBody,
      playlists: newPlayList,
    };
    await TOKEN_API.post(`/diary`, newDiary);
    navigate(`/`);
  };

  // 제목 수정 체인지 이벤트
  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 플레이리스트 수정 체인지 이벤트
  const changeNewUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  // 전체 url을 입력받은 후 id만 필터링
  const getVideoId = (url: string) => {
    if (url.indexOf("/watch") > -1) {
      const arr = url.replaceAll(/=|&/g, "?").split("?");
      return arr[arr.indexOf("v") + 1];
    } else if (url.indexOf("/youtu.be") > -1) {
      const arr = url.replaceAll(/=|&|\//g, "?").split("?");
      return arr[arr.indexOf("youtu.be") + 1];
    } else {
      return "none";
    }
  };

  // input에 등록한 Url 정보 불러옴
  const getYoutubeData = async (id: any) => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
      &part=snippet`);
      return res.data.items[0].snippet;
    } catch (err) {
      console.error(err);
    }
  };

  // 추가 버튼 클릭 시 플레이리스트 담는 이벤트 핸들러
  const addPlayList = () => {
    const musicInfo: PlaylistData = {};
    const urlId = getVideoId(newUrl);

    getYoutubeData(urlId)
      .then((res) => {
        musicInfo.channelId = res.channelId;
        musicInfo.thumbnail = res.thumbnails.default.url;
        musicInfo.title = res.title;
        musicInfo.url = newUrl;
      })
      .then(() => {
        setNewPlayList((value) => [...value, musicInfo]);
        setNewUrl("");
      });
  };

  return (
    <MainContainer>
      <MainWrapper>
        <TitleArea>
          <input
            className='inputTitle'
            type='text'
            placeholder='제목을 입력하세요'
            onChange={changeNewTitle}
          />
          <SubmitButton onClick={submitHandler} disabled={newTitle.length === 0}>
            등록하기
          </SubmitButton>
        </TitleArea>
        <AlbumCoverArea>
          <div className='coverImg'></div>
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {currentUser.nickname}
            </UserInfo>
            <UserInfo>
              <span className='text'>등록일</span>
              {today.toString()}
            </UserInfo>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setNewBody(e)}
          />
        </AlbumInfoArea>
        <PlayListArea>
          <div className='playTitle'>다이어리 수록곡</div>
          <UrlInput>
            <input
              value={newUrl}
              placeholder='유튜브 URL을 입력해 주세요'
              onChange={changeNewUrl}
            />
            <button className='sumbit' onClick={addPlayList} disabled={newUrl.length === 0}>
              추가
            </button>
          </UrlInput>
          {newPlayList?.map((value, index) => {
            return (
              <NewPlayList
                list={value}
                key={index}
                newPlayList={newPlayList}
                setNewPlayList={setNewPlayList}
              />
            );
          })}
        </PlayListArea>
      </MainWrapper>
    </MainContainer>
  );
}

export default NewMain;
