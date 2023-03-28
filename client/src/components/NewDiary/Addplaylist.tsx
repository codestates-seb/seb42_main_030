import { useState } from "react";
import { CSSProperties } from "react";
import styled from "styled-components";

// 여기에서 해야 될 것.

// 1 검색창 구성 요소
// 검색창 구성 요소는 검색어 입력창과 검색 버튼으로 구성됩니다. 검색 버튼을 클릭하면, 입력한 검색어를 기반으로 YouTube API를 호출하여 검색 결과를 가져와야 합니다.

// 2 검색 결과 리스트 구성 요소
// 검색 결과 리스트 구성 요소는 API를 호출하여 가져온 검색 결과를 리스트 형태로 보여주는 역할을 합니다. 각 리스트 아이템을 클릭하면, 해당 음악을 선택한 것으로 간주하여 선택한 음악을 플레이 리스트에 추가할 수 있어야 합니다.

// 3 플레이 리스트 구성 요소
// 플레이 리스트 구성 요소는 선택한 음악들이 나열되어 있는 리스트입니다. 선택한 음악이 플레이 리스트에 추가되면, 해당 음악들이 이 리스트에 나열되어야 합니다.

// 4 플레이 리스트에 음악 추가하는 함수
// 플레이 리스트에 음악을 추가하는 함수는, 검색 결과 리스트에서 음악을 선택한 후, 플레이 리스트에 추가하는 역할을 합니다. 이때, 선택한 음악에 대한 정보를 플레이 리스트에 추가하는 것이 중요합니다.

//form 태그는 사용자 입력을 받아 서버로 제출하기 위한 용도로 사용되는 태그
const Addplaycss = styled.form<AddplaycssProps>`
  display: flex;
  flex-direction: column;
  width: 800px;
  border: 1px solid black;
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
type AddplaycssProps = {
  style?: CSSProperties; // 이 props는 컴포넌트가 렌더링될 때 해당 요소에 적용될 CSS 스타일을 정의할 수 있도록 해줍니다.
};
export default function Addplaylist() {
  const [SearchTitle, setSearchTitle] = useState<string>();
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const handleSearch = async () => {
    //검색어를 이용하여 Spotify API를 호출하여 검색 결과를 가져오는 역할을 하고, 그 결과를 state에 저장하는 함수
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${SearchTitle}&type=track`
    );
    const data = await response.json();
    setSearchResults(data.tracks.items); // 검색결과를 setSearchResults 상태값으로 업데이트.
  };
  type Track = {
    id: string;
    name: string;
    artists: {
      name: string;
    }[];
    album: {
      name: string;
    };
    uri: string;
  };
  const addTrackToPlaylist = async (track: Track) => {
    const accessToken = "my-access-token"; // 액세스 토큰을 가져와서 사용해야 합니다.
    const trackUri = track.uri;

    // 플레이리스트 ID를 가져와야 합니다.
    const playlistId = "my-playlist-id";

    // 해당 플레이리스트에 곡 추가하기
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <Addplaycss>
      <h2 className='aph2'>이 플레이 리스트에 추가</h2>
      <div className='search-container'>
        <input
          className='searchinput'
          type={"text"}
          placeholder='듣고 싶은 음악을 검색해 주세요'
          value={SearchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            console.log(SearchTitle);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        ></input>
        <div
          className='search-button'
          onClick={() => {
            handleSearch();
          }}
        >
          🔍검색
        </div>
      </div>
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((track) => (
            <div key={track.id}>
              <div>{track.name}</div>
              <div>{track.artists[0].name}</div>
              <div>{track.album.name}</div>
              <button onClick={() => addTrackToPlaylist(track)}>추가</button>
            </div>
          ))}
        </div>
      )}
    </Addplaycss>
  );
}
