import * as NewMain from "../NewDiary/NewMain";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import EditPlayList from "./EditPlayList";
import { PlaylistData } from "../../util/Type";

function EditList({ list }: DiaryDataProps) {
  const [editTitle, setEditTitle] = useState<string>(list.title);
  const [editBody, setEditBody] = useState<string>(list.body);
  const [editPlayList, setEditPlayList] = useState<PlaylistData[]>(list.playlists);
  const [editUrl, setEditUrl] = useState<string>("");

  const navigate = useNavigate();
  const { diaryId } = useParams();

  // 다이어리 patch 요청
  const submitHandler = async () => {
    const editDiary = {
      title: editTitle,
      body: editBody,
      playlists: editPlayList,
    };
    await TOKEN_API.patch(`/diary/${diaryId}`, editDiary);
    navigate(`/DetailDiary/${diaryId}`);
  };

  // 제목 수정 체인지 이벤트
  const changeEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  // 플레이리스트 수정 체인지 이벤트
  const changeEditUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
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
    const urlId = getVideoId(editUrl);

    getYoutubeData(urlId)
      .then((res) => {
        musicInfo.channelId = res.channelId;
        musicInfo.thumbnail = res.thumbnails.default.url;
        musicInfo.title = res.title;
        musicInfo.url = editUrl;
      })
      .then(() => {
        setEditPlayList((value) => [...value, musicInfo]);
        setEditUrl("");
      });
  };

  return (
    <NewMain.MainContainer>
      <NewMain.MainWrapper>
        <NewMain.TitleArea>
          <input
            className='inputTitle'
            type='text'
            value={editTitle}
            placeholder='제목을 입력하세요'
            onChange={changeEditTitle}
          />
          <NewMain.SubmitButton onClick={submitHandler} disabled={editTitle.length === 0}>
            수정하기
          </NewMain.SubmitButton>
        </NewMain.TitleArea>
        <NewMain.AlbumCoverArea>
          <div className='coverImg'></div>
          <NewMain.InfoArea>
            <NewMain.UserInfo>
              <span className='text'>등록자</span>
              {list.userNickname}
            </NewMain.UserInfo>
            <NewMain.UserInfo>
              <span className='text'>등록일</span>
              {list.createdAt.substring(0, 10)}
            </NewMain.UserInfo>
          </NewMain.InfoArea>
        </NewMain.AlbumCoverArea>
        <NewMain.AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            value={editBody}
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setEditBody(e)}
          />
        </NewMain.AlbumInfoArea>
        <NewMain.PlayListArea>
          <div className='playTitle'>다이어리 수록곡</div>
          <NewMain.UrlInput>
            <input
              value={editUrl}
              placeholder='유튜브 URL을 입력해 주세요'
              onChange={changeEditUrl}
            />
            <button className='sumbit' onClick={addPlayList} disabled={editUrl.length === 0}>
              추가
            </button>
          </NewMain.UrlInput>
          {editPlayList?.map((value, index) => {
            return (
              <EditPlayList
                list={value}
                key={index}
                editPlayList={editPlayList}
                setEditPlayList={setEditPlayList}
              />
            );
          })}
        </NewMain.PlayListArea>
      </NewMain.MainWrapper>
    </NewMain.MainContainer>
  );
}

export default EditList;
