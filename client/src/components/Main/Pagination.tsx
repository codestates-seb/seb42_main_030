import styled from "styled-components";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const PageNum = styled.div`
  margin: 50px 0 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  user-select: none;

  > .pageTab,
  .leftHandle,
  .rightHandle {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    font-size: 15px;
    margin: 0 5px 0 5px;
  }

  > .pageFocused {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background-color: #ffefd5;
    border: none;
    border-radius: 50px;
    color: #1c1a16;
    font-weight: 600;
  }
`;

interface PaginationProps {
  allPageLength: number;
  LIMIT_COUNT: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentTab: number;
  // tagOnePageLength: number;
  // tagTwoPageLength: number;
  // tagThreePageLength: number;
  // tagFourPageLength: number;
  // tagFivePageLength: number;
  // tagSixPageLength: number;
  // tagSevenPageLength: number;
  // tagEightPageLength: number;
}

function Pagination({
  LIMIT_COUNT,
  page,
  setPage,
  currentTab,
  allPageLength,
}: // tagOnePageLength,
// tagTwoPageLength,
// tagThreePageLength,
// tagFourPageLength,
// tagFivePageLength,
// tagSixPageLength,
// tagSevenPageLength,
// tagEightPageLength,
PaginationProps) {
  const [blockNum, setBlockNum] = useState<number>(0); // 페이지 당 표시할 페이지네이션 수

  const PAGE_COUNT: number = 10; // 페이지 당 표시할 페이지네이션 수 (기본값 : 10개의 페이지네이션 노출)
  const blockArea: number = blockNum * PAGE_COUNT; // 각 페이지에서 첫 페이지네이션의 위치 계산

  const numAllPages: number = Math.ceil(allPageLength / LIMIT_COUNT); // 필요한 페이지 개수
  // const numTagOnePages: number = Math.ceil(tagOnePageLength / LIMIT_COUNT);
  // const numTagTwoPages: number = Math.ceil(tagTwoPageLength / LIMIT_COUNT);
  // const numTagThreePages: number = Math.ceil(tagThreePageLength / LIMIT_COUNT);
  // const numTagFourPages: number = Math.ceil(tagFourPageLength / LIMIT_COUNT);
  // const numTagFivePages: number = Math.ceil(tagFivePageLength / LIMIT_COUNT);
  // const numTagSixPages: number = Math.ceil(tagSixPageLength / LIMIT_COUNT);
  // const numTagSevenPages: number = Math.ceil(tagSevenPageLength / LIMIT_COUNT);
  // const numTagEightPages: number = Math.ceil(tagEightPageLength / LIMIT_COUNT);

  // 새로운 배열 생성 함수
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };
  const allArr: number[] = createArr(numAllPages); // nArr 함수에 전체 페이지의 개수를 배열로 담음
  // const tagOneArr: number[] = createArr(numTagOnePages);
  // const tagTwoArr: number[] = createArr(numTagTwoPages);
  // const tagThreeArr: number[] = createArr(numTagThreePages);
  // const tagFourArr: number[] = createArr(numTagFourPages);
  // const tagFiveArr: number[] = createArr(numTagFivePages);
  // const tagSixArr: number[] = createArr(numTagSixPages);
  // const tagSevenArr: number[] = createArr(numTagSevenPages);
  // const tagEightArr: number[] = createArr(numTagEightPages);

  // 제일 처음 페이지로 이동하는 버튼 이벤트 핸들러
  const firstPageHandler = () => {
    setPage(1);
    setBlockNum(0);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const lastPageHandler = () => {
    setPage(numAllPages);
    setBlockNum(Math.ceil(numAllPages / PAGE_COUNT) - 1);
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
    if (page >= numAllPages) {
      return;
    } else if (PAGE_COUNT * (blockNum + 1) < page + 1) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  return (
    <>
      <PageNum>
        <button className='leftHandle' onClick={firstPageHandler} disabled={page === 1}>
          <BiArrowToLeft size={20} />
        </button>
        <button className='leftHandle' onClick={prevPageHandler} disabled={page === 1}>
          <BiLeftArrowAlt size={19} />
        </button>
        {allArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
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
        <button className='rightHandle' onClick={nextPageHandler} disabled={page === numAllPages}>
          <BiRightArrowAlt size={19} />
        </button>
        <button className='rightHandle' onClick={lastPageHandler} disabled={page === numAllPages}>
          <BiArrowToRight size={20} />
        </button>
      </PageNum>
      {/* {currentTab === 0 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {allArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numAllPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numAllPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 1 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagOneArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagOnePages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagOnePages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 2 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagTwoArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagTwoPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagTwoPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 3 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagThreeArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagThreePages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagThreePages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 4 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagFourArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagFourPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagFourPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 5 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagFiveArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagFivePages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagFivePages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 6 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagSixArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagSixPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagSixPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : currentTab === 7 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagSevenArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagSevenPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagSevenPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={page === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={page === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {tagEightArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={page === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setPage(n);
                window.scrollTo(
                  0,
                  parseInt(document.body.style.top || "0", 10) * -1
                );
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={page === numTagEightPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={lastPageHandler}
            disabled={page === numTagEightPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      )} */}
    </>
  );
}

export default Pagination;
