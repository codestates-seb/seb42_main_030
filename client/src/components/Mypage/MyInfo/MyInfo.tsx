import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import { UserData } from "../../../Type";

const MyInfoContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
`;

function MyInfo() {
  const [userData, setUserData] = useState<UserData[]>([]);

  // 나의 유저 정보만 불러오는 get 요청
  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user?id=1");
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MyInfoContainer>
      <ul>
        {userData.map((value: any) => {
          return (
            <Profile list={value} key={value.id} getUserData={getUserData} />
          );
        })}
      </ul>
    </MyInfoContainer>
  );
}

export default MyInfo;
