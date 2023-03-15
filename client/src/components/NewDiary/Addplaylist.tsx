// 여기에서 해야 될 것.

// 1 검색창 구성 요소
// 검색창 구성 요소는 검색어 입력창과 검색 버튼으로 구성됩니다. 검색 버튼을 클릭하면, 입력한 검색어를 기반으로 YouTube API를 호출하여 검색 결과를 가져와야 합니다.

// 2 검색 결과 리스트 구성 요소
// 검색 결과 리스트 구성 요소는 API를 호출하여 가져온 검색 결과를 리스트 형태로 보여주는 역할을 합니다. 각 리스트 아이템을 클릭하면, 해당 음악을 선택한 것으로 간주하여 선택한 음악을 플레이 리스트에 추가할 수 있어야 합니다.

// 3 플레이 리스트 구성 요소
// 플레이 리스트 구성 요소는 선택한 음악들이 나열되어 있는 리스트입니다. 선택한 음악이 플레이 리스트에 추가되면, 해당 음악들이 이 리스트에 나열되어야 합니다.

// 4 플레이 리스트에 음악 추가하는 함수
// 플레이 리스트에 음악을 추가하는 함수는, 검색 결과 리스트에서 음악을 선택한 후, 플레이 리스트에 추가하는 역할을 합니다. 이때, 선택한 음악에 대한 정보를 플레이 리스트에 추가하는 것이 중요합니다.
import { useState } from "react";
import {CSSProperties} from "react";

type AddplaycssProps = {
    style?: CSSProperties; // 이 props는 컴포넌트가 렌더링될 때 해당 요소에 적용될 CSS 스타일을 정의할 수 있도록 해줍니다.
}
import styled from "styled-components";
const Addplaycss = styled.form<AddplaycssProps>`//form 태그는 사용자 입력을 받아 서버로 제출하기 위한 용도로 사용되는 태그
display: flex;
flex-direction: column;
width : 800px;
border: 1px solid black;
.aph2{
    text-align: center;
}
.searchinput{
    display: block;
    margin: 0;
    width: 90%;
}
.search-container{
    display: flex;
    flex-direction: row;
}
.search-button{
    margin-left: 10px;
}
`

export default function AddPlayList() {
    const [SearchTitle, setSearchTitle]  = useState<string>(); 
    return(
        <Addplaycss>
            <h2 className='aph2'>이 플레이 리스트에 추가</h2>
            <div className='search-container'>
        <input
          className='searchinput'
          type={'text'}
          placeholder="듣고 싶은 음악을 검색해 주세요"
           value={SearchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            console.log(SearchTitle);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // SearchTitle 이용해서 enter 누르면 검색되는 코드 ㅜ
            }
        }}
        ></input>
        <div className='search-button' onClick={()=>{
            //'SearchTitle 이용해서 버튼 누르면 검색되는 코드 ㅜ'
        }}>
        🔍검색
        </div>
        </div>
    </Addplaycss>
    )}
    