import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    logo: string;
    background: string;
    mainText: string;
    subText: string;
    mainColor: string;
    buttonHover: string;

    // main
    diaryDate: string;
    diaryInfoLine: string;

    TagColor: string;
    disabledTagColor: string;
    disabledTagBorder: string;
    disabledTagBackground: string;
    disabled: string;

    // detail
    detailLine: string;
    likeHover: string;
    commentInputBackground: string;
    playListHover: string;
    editBorder: string;
  }
}
