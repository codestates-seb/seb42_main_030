import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import MyDiaryList from "./MyDiary/MyDiaryList";
import MypagePagination from "./MypagePagination";
import MyCommentProps from "./MyComment/MyCommentProps";
import MyInfo from "./MyInfo/MyInfo";
import MyLikeList from "./MyLikeDiary/MyLikeList";

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  margin: 50px 0 50px 0;
  gap: 10px;
  /* border: 1px solid black; */

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 40px;
    /* border: 1px solid black; */
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

const MypageMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

const DiaryCommentWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
`;

interface ImageDataProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  userData: any;
  getUserData: any;
}

export interface ICommentData {
  id: number;
  nickname: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
}

export interface IMyDiaryData {
  id: number;
  nickname: string;
  title: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
  viewcount: number;
  tag: string[];
  like: number;
  comment: ICommentData[];
}

function MypageMain({
  image,
  setImage,
  userData,
  getUserData,
}: ImageDataProps) {
  const [myDiaryData, setMyDiaryData] = useState<IMyDiaryData[]>([]);
  const [myLikeDiaryData, setLikeDiaryData] = useState<any[]>([]);
  const [myCommentData, setMyCommentData] = useState<IMyDiaryData[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const LIMIT_COUNT: number = 20;
  const offset: number = (page - 1) * LIMIT_COUNT;

  // 나의 다이어리 데이터 get 요청
  const getMyDiaryData = async () => {
    try {
      // const isLogin = localStorage.getItem('nickname')
      // nickname=${이 부분을 로그인한 사용자의 닉네임으로 변경}
      const res = await axios.get(
        `http://localhost:3001/diary?nickname=donggu`
      );
      setMyDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyDiaryData();
  }, []);

  // 내가 좋아요 한 다이어리 데이터 get 요청
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

  // 내가 작성한 댓글 데이터 get 요청
  const getMyCommentData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/diary`);
      setMyCommentData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyCommentData();
  }, []);

  const tabArr = [
    { feel: "내 정보" },
    { feel: "나의 다이어리" },
    { feel: "좋아한 다이어리" },
    { feel: "작성한 댓글" },
  ];

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <ListTab>
        {" "}
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
      <MypageMainContainer>
        {currentTab === 0 ? (
          <MyInfo
            image={image}
            setImage={setImage}
            userData={userData}
            getUserData={getUserData}
          />
        ) : currentTab === 1 ? (
          <DiaryMainWrapper>
            {myDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyLikeList list={value} key={value.id} />;
            })}
          </DiaryMainWrapper>
        ) : currentTab === 2 ? (
          <DiaryMainWrapper>
            {myLikeDiaryData
              .slice(offset, offset + LIMIT_COUNT)
              .map((value) => {
                return <MyDiaryList list={value} key={value.id} />;
              })}
          </DiaryMainWrapper>
        ) : (
          <DiaryCommentWrapper>
            {myCommentData.map((value) => {
              return <MyCommentProps list={value} key={value.id} />;
            })}
          </DiaryCommentWrapper>
        )}
      </MypageMainContainer>
      <MypagePagination
        myPageLength={myDiaryData.length}
        myLikePageLength={myLikeDiaryData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        page={page}
        setPage={setPage}
        currentTab={currentTab}
      />
    </>
  );
}

export default MypageMain;
