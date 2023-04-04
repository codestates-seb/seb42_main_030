import * as Pagination from "../Main/Pagination";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface PaginationProps {
  myPageLength: number;
  myLikePageLength: number;
  myCommentPageLength: number;
  LIMIT_COUNT: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentTab: number;
}

function MypagePagination({
  LIMIT_COUNT,
  page,
  setPage,
  currentTab,
  myPageLength,
  myLikePageLength,
  myCommentPageLength,
}: PaginationProps) {
  const [blockNum, setBlockNum] = useState<number>(0); // 페이지 당 표시할 페이지네이션 수

  const PAGE_COUNT: number = 1; // 페이지 당 표시할 페이지네이션 수 (기본값 : 10개의 페이지네이션 노출)
  const blockArea: number = blockNum * PAGE_COUNT; // 각 페이지에서 첫 페이지네이션의 위치 계산

  const numMyPages: number = Math.ceil(myPageLength / LIMIT_COUNT); // 나의 다이어리 페이지 개수
  const numMyLikePages: number = Math.ceil(myLikePageLength / LIMIT_COUNT); // 좋아한 다이러리 페이지 개수
  const numCommentPages: number = Math.ceil(myCommentPageLength / LIMIT_COUNT); // 내가 작성한 댓글 페이지 개수

  // 새로운 배열 생성 함수
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };
  const myArr: number[] = createArr(numMyPages);
  const likeArr: number[] = createArr(numMyLikePages);
  const commentArr: number[] = createArr(numCommentPages);

  // 제일 처음 페이지로 이동하는 버튼 이벤트 핸들러
  const firstPageHandler = () => {
    setPage(1);
    setBlockNum(0);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const lastPageHandler = () => {
    setPage(numMyPages);
    setBlockNum(Math.ceil(numMyPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const prevPageHandler = () => {
    if (page <= 1) {
      return;
    } else if (page - 1 <= PAGE_COUNT * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (page >= numMyPages) {
      return;
    } else if (PAGE_COUNT * (blockNum + 1) < page + 1) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  return (
    <>
      {currentTab === 1 ? (
        <Pagination.PageNum>
          <button className='leftHandle' onClick={firstPageHandler} disabled={page === 1}>
            <BiArrowToLeft size={20} />
          </button>
          <button className='leftHandle' onClick={prevPageHandler} disabled={page === 1}>
            <BiLeftArrowAlt size={19} />
          </button>
          {myArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
              }}
            >
              {n}
            </button>
          ))}
          <button className='rightHandle' onClick={nextPageHandler} disabled={page === numMyPages}>
            <BiRightArrowAlt size={19} />
          </button>
          <button className='rightHandle' onClick={lastPageHandler} disabled={page === numMyPages}>
            <BiArrowToRight size={20} />
          </button>
        </Pagination.PageNum>
      ) : currentTab === 2 ? (
        <Pagination.PageNum>
          <button className='leftHandle' onClick={firstPageHandler} disabled={page === 1}>
            <BiArrowToLeft size={20} />
          </button>
          <button className='leftHandle' onClick={prevPageHandler} disabled={page === 1}>
            <BiLeftArrowAlt size={19} />
          </button>
          {likeArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
              }}
            >
              {n}
            </button>
          ))}
          <button className='rightHandle' onClick={nextPageHandler} disabled={page === numMyPages}>
            <BiRightArrowAlt size={19} />
          </button>
          <button className='rightHandle' onClick={lastPageHandler} disabled={page === numMyPages}>
            <BiArrowToRight size={20} />
          </button>
        </Pagination.PageNum>
      ) : currentTab === 3 ? (
        <Pagination.PageNum>
          <button className='leftHandle' onClick={firstPageHandler} disabled={page === 1}>
            <BiArrowToLeft size={20} />
          </button>
          <button className='leftHandle' onClick={prevPageHandler} disabled={page === 1}>
            <BiLeftArrowAlt size={19} />
          </button>
          {commentArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
              }}
            >
              {n}
            </button>
          ))}
          <button className='rightHandle' onClick={nextPageHandler} disabled={page === numMyPages}>
            <BiRightArrowAlt size={19} />
          </button>
          <button className='rightHandle' onClick={lastPageHandler} disabled={page === numMyPages}>
            <BiArrowToRight size={20} />
          </button>
        </Pagination.PageNum>
      ) : null}
    </>
  );
}

export default MypagePagination;
