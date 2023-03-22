// import quill & css
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { memo, useRef, useState, useMemo, RefObject } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledQuillEditor = styled(ReactQuill)`
  .ql-editor {
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto; //스크롤이 자동으로 생성되도록 설정
  }
`;
// props 타입정의
type QuillEditorProps = {
  className?: string;
  quillRef: RefObject<ReactQuill>; //quillRef는 React에서 컴포넌트의 인스턴스에 대한 참조를 제공하기 위해 사용하는 RefObject,ReactQuill 컴포넌트의 인스턴스를 참조하기 위해 사용됨. 이를 통해 컴포넌트 외부에서 해당 인스턴스의 메서드나 속성에 접근할 수 있음.
  htmlContent: string; //ReactQuill 컴포넌트의 value prop으로 전달되어, 에디터의 현재 내용을 표시합니다.(에디터에서 사용할 현재 HTML 컨텐츠)
  setHtmlContent: (value: string) => void; //에디터의 내용이 변경될 때 호출되는 함수
};

const QuillEditor = memo(
  ({ className, quillRef, htmlContent, setHtmlContent }: QuillEditorProps) => {
    const imageHandler = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files;
        if (file !== null) {
          const formData = new FormData();
          formData.append("image", file[0]);
          const reader = new FileReader();

          reader.onload = async () => {
            const url = reader.result; // 로컬에서 읽은 이미지 URL

            const range = quillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
              let quill = quillRef.current?.getEditor();

              quill?.setSelection(range, 1);

              quill?.clipboard.dangerouslyPasteHTML(
                range,
                `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
              );
            }
          };

          try {
            reader.readAsDataURL(file[0]);
          } catch (error) {
            console.error("파일 읽기 중 오류 발생:", error);
          }

          // 이미지 파일 업로드 로직을 여기로 옮깁니다.
          try {
            const res = await axios.post("BE API 주소", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            // 서버에서 받아온 이미지 URL을 사용합니다.
            // const url = res.data.imageUrl;
          } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
          }
        }
      };
    };

    const modules = useMemo(
      () => ({
        toolbar: {
          // 툴바에 넣을 기능
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
            ],
            ["image", "video"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      }),
      []
    );

    return (
      <>
        <StyledQuillEditor
          className={className}
          ref={quillRef}
          // ref={(element) => {
          //     if (element !== null) {
          //         quillRef.current = element;
          //     }
          //   }}
          value={htmlContent}
          onChange={setHtmlContent}
          modules={modules}
          theme='snow'
          style={{ height: "85%", minHeight: "100px" }} // style
        />
      </>
    );
  }
);

export default QuillEditor;
