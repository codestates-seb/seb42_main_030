import { useState } from "react";
import styled from "styled-components";
import React from 'react';

const AddPlaylistcss = styled.div`
display: block; // 이부분 모달창팝업으로 block로 바꾸는식으로 구현..하려다 안됨...
background: #963a8e;
position: fixed;
z-index: 5;
top: 35%;
left: 50%;
transform: translate(-50%, -50%);
  /* display: flex; */
  flex-direction: column;
  width: 800px;
  height: 400px;
  border: 1px solid white;
  .aph2 {
    text-align: center;
  }
  .searchinput {
    display: block;
    margin: 0;
    width: 90%;
  }
  .search-container {
    display: flex;
    flex-direction: row;
  }
  .search-button {
    margin-left: 10px;
  }
`;

// interface AddPlaylistProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
type AddPlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setShowAddPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default React.memo(function AddPlaylist({
  isOpen,
  onClose,
  setShowAddPlaylistModal,
}: AddPlaylistModalProps): JSX.Element {
  const [searchTitle, setSearchTitle] = useState<string>("");

  const handleSearch = () => {
    console.log(searchTitle);
  };

  return (
    <AddPlaylistcss style={{ display: isOpen ? "block" : "none" }}>
      <div className="aplClose" onClick={onClose}></div>
      <h2 className="aph2">이 플레이 리스트에 추가</h2>
      <div className="search-container">
        <input
          className="searchinput"
          type={"text"}
          placeholder="듣고 싶은 음악을 검색해 주세요"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            console.log(searchTitle);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div className="search-button" onClick={() => handleSearch()}>
          🔍검색
        </div>
      </div>
      
    </AddPlaylistcss>
  );
});