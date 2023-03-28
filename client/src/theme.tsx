import { DefaultTheme } from "styled-components";

export const lightMode: DefaultTheme = {
  logo: `#22262c`,
  background: `white`,
  mainText: `#22262c`,
  subText: `#495057`,
  mainColor: `#ffefd5`,
  buttonHover: `#ffdeb7`,

  // main
  diaryBackground: `white`,
  diaryDate: `#9aa1a8`,
  diaryInfoLine: `#f1f3f5`,

  TagColor: `#22262c`,
  disabledTagColor: `gray`,
  disabledTagBorder: `#d1d1d1`,
  disabledTagBackground: `white`,
  disabled: `lightgray`,

  // detail
  detailLine: `#d9d9d9`,
  likeHover: `#f1f3f5`,
  commentInputBackground: `white`,
  playListHover: `#f1f3f5`,
  editBorder: `gray`,
};

export const darkMode: DefaultTheme = {
  logo: `#ececec`,
  background: `#1f2125`,
  mainText: `#ececec`,
  subText: `#a6a6a6`,
  mainColor: `#ffefd5`,
  buttonHover: `#ffdeb7`,

  // main
  diaryBackground: `#2f3135`,
  diaryDate: `#9aa1a8`,
  diaryInfoLine: `#3C4048`,

  TagColor: `#22262c`,
  disabledTagColor: `gray`,
  disabledTagBorder: `none`,
  disabledTagBackground: `#2f3135`,
  disabled: `gray`,

  // detail
  detailLine: `#3C4048`,
  likeHover: `#2f3135`,
  commentInputBackground: `#3C4048`,
  playListHover: `#3C4048`,
  editBorder: `gray`,
};

// ${(props) => props.theme.background};
