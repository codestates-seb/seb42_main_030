import styled from "styled-components";
import PlayList from "../DetailDiary/PlayList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_API } from "../../util/API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EditMainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

const TitleArea = styled.div`
  height: 90px;
  display: flex;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 10px 0 10px;

  > .EditTitle {
    width: 580px;
    font-size: 24px;
    color: ${(props) => props.theme.mainText};
    background-color: ${(props) => props.theme.background};
    font-weight: 600;
    padding: 10px 8px 10px 8px;
    border: 0.5px solid ${(props) => props.theme.editBorder};
    border-radius: 4px;
    &:focus {
      outline: none;
    }
  }
`;

const EditButton = styled.button`
  font-size: 13px;
  color: #1c1a16;
  font-weight: 700;
  background-color: #ffefd5;
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ffdeb7;
  }
`;

const AlbumCoverArea = styled.div`
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

const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
`;

const UserInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.subText};

  > .text {
    color: ${(props) => props.theme.mainText};
    font-size: 13px;
    margin-right: 50px;
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    color: ${(props) => props.theme.mainText};
    background-color: ${(props) => props.theme.background};
    width: 100%;
    height: 200px;

    > .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 0.5px solid ${(props) => props.theme.editBorder};
    }

    > .ql-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 0.5px solid ${(props) => props.theme.editBorder};
    }
  }
`;

function NewMain() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");

  const navigate = useNavigate();
  const today: any = new Date().toISOString().substring(0, 10);

  // 다이어리 post 요청
  const submitHandler = async () => {
    const newDiary = {
      title: newTitle,
      body: newBody,
    };
    await TOKEN_API.post(`/diary`, newDiary);
    navigate(`/`);
  };

  // 제목 수정 체인지 이벤트
  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 본문 수정 체인지 이벤트
  const changeNewBody = (e: any) => {
    setNewBody(e);
  };

  return (
    <EditMainContainer>
      <EditMainWrapper>
        <TitleArea>
          <input
            className='EditTitle'
            type='text'
            placeholder='제목을 입력하세요'
            onChange={changeNewTitle}
          />
          <EditButton
            className='EditButton'
            onClick={submitHandler}
            disabled={newTitle.length === 0}
          >
            등록하기
          </EditButton>
        </TitleArea>
        <AlbumCoverArea>
          <div className='coverImg'></div>
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {/* {list.userNickname} */}
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
            onChange={changeNewBody}
          />
        </AlbumInfoArea>
        <PlayList />
      </EditMainWrapper>
    </EditMainContainer>
  );
}

export default NewMain;