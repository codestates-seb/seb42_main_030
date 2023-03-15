import styled from "styled-components";
import { useState } from "react";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";

const PageNum = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  user-select: none;
  margin-bottom: 50px;

  > .pageTab,
  .leftHandle,
  .rightHandle {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.text};
    font-size: 15px;
    margin: 0 5px 0 5px;
    font-weight: 600;
  }

  > .pageFocused {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background-color: #ffe575;
    border: none;
    border-radius: 50px;
    color: black;
  }

  /* > button:hover {
    text-decoration: none;
  } */
`;

interface PaginationProps {
  allPageLength: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ allPageLength, limit, page, setPage }: PaginationProps) {
  const [blockNum, setBlockNum] = useState<number>(0); // 페이지 당 표시할 페이지네이션 수
  const pageLimit: number = 10; // 페이지 당 표시할 페이지네이션 수 (기본값 : 10개의 페이지네이션 노출)
  const blockArea: number = blockNum * pageLimit; // 각 페이지에서 첫 페이지네이션의 위치 계산

  // 필요한 페이지 개수 === 총 데이터 수(allPageLength === todoData.length) / 페이지 당 표시할 데이터 수(limit === 10)
  const numAllPages: number = Math.ceil(allPageLength / limit);

  // 새로운 배열 생성 함수
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };
  const allArr: number[] = createArr(numAllPages); // nArr 함수에 전체 페이지의 개수를 배열로 담음

  // 제일 처음 페이지로 이동하는 버튼 이벤트 핸들러
  const firstPageHandler = () => {
    setPage(1);
    setBlockNum(0);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const lastPageHandler = () => {
    setPage(numAllPages);
    setBlockNum(Math.ceil(numAllPages / pageLimit) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const prevPageHandler = () => {
    if (page <= 1) {
      return;
    } else if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (page >= numAllPages) {
      return;
    } else if (pageLimit * (blockNum + 1) < page + 1) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  return (
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
      {allArr.slice(blockArea, pageLimit + blockArea).map((n) => (
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
  );
}

export default Pagination;
