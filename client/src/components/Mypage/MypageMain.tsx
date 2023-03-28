import MyDiary from "./MyDiary";
import MypagePagination from "./MypagePagination";
import MyLikeDiary from "./MyLikeDiary";
import MyComment from "./MyComment";
import MyInfo from "./MyInfo";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { DiaryData } from "../../util/Type";
import { CommentData } from "../../util/Type";
import { UserData } from "../../util/Type";
import { BASE_API } from "../../util/API";

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 50px 0 50px 0;
  gap: 10px;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 40px;
    text-align: center;

    > .el {
      color: #495057;
    }
  }

  .focused {
    border-bottom: 2px solid #1c1a16;

    > .el {
      color: #1c1a16;
    }
  }
`;

const MypageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
`;

const DiaryContainer = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

const CommentContainer = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
`;

function MypageMain() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [myDiaryData, setMyDiaryData] = useState<DiaryData[]>([]);
  const [myLikeDiaryData, setLikeDiaryData] = useState<DiaryData[]>([]);
  const [myCommentData, setMyCommentData] = useState<CommentData[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const LIMIT_COUNT: number = 20;
  const offset: number = (page - 1) * LIMIT_COUNT;

  // Tab 1(MyInfo) : 나의 유저 정보만 불러오는 get 요청
  const getUserData = async () => {
    try {
      const res = await BASE_API.get(`/users/1`);
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  // Tab 2(MyDiary) : 나의 다이어리 데이터 get 요청
  const getMyDiaryData = async () => {
    try {
      // const isLogin = localStorage.getItem('nickname')
      // nickname=${이 부분을 로그인한 사용자의 닉네임으로 변경}
      // 현재 엔드포인트에 diaryId만 붙을 수 있는데 ?userNickname=light 이런 식으로 붙을 순 없는지?
      const res = await BASE_API.get(`/diary`);
      setMyDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyDiaryData();
  }, []);

  // Tab 3(MyLikeDiary) : 내가 좋아요 한 다이어리 데이터 get 요청
  const getLikeData = async () => {
    try {
      // const isLogin = localStorage.getItem('nickname')
      // nickname=${이 부분을 로그인한 사용자의 닉네임으로 변경}
      const res = await axios.get(`http://localhost:3001/likediary`);
      setLikeDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLikeData();
  }, []);

  // Tab 4(MyComment) : 내가 작성한 댓글 데이터 get 요청
  const getMyCommentData = async () => {
    try {
      const res = await BASE_API.get(`/comment`);
      setMyCommentData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyCommentData();
  }, []);

  // 마이 페이지 탭 리스트
  const tabArr = [
    { feel: "내 정보" },
    { feel: "나의 다이어리" },
    { feel: "좋아한 다이어리" },
    { feel: "작성한 댓글" },
  ];

  // 탭 선택 이벤트 핸들러
  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <ListTab>
        {tabArr.map((tab, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "tab focused" : "tab"}
              onClick={() => selectTabHandler(index)}
            >
              <div className='el'>{tab.feel}</div>
            </li>
          );
        })}
      </ListTab>
      <MypageContainer>
        {currentTab === 0 ? (
          <InfoContainer>
            {Object.values(userData).map((value: any) => {
              return <MyInfo list={value} key={value.userId} getUserData={getUserData} />;
            })}
          </InfoContainer>
        ) : currentTab === 1 ? (
          <DiaryContainer>
            {myDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyDiary list={value} key={value.diaryId} />;
            })}
          </DiaryContainer>
        ) : currentTab === 2 ? (
          <DiaryContainer>
            {myLikeDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyLikeDiary list={value} key={value.diaryId} />;
            })}
          </DiaryContainer>
        ) : (
          <CommentContainer>
            {myCommentData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyComment list={value} key={value.commentId} />;
            })}
          </CommentContainer>
        )}
      </MypageContainer>
      <MypagePagination
        myPageLength={myDiaryData.length}
        myLikePageLength={myLikeDiaryData.length}
        myCommentPageLength={myCommentData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        page={page}
        setPage={setPage}
        currentTab={currentTab}
      />
    </>
  );
}

export default MypageMain;
