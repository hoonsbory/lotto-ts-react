import React, { useEffect } from "react";
import CopyURL from "../SnsIcon/CopyUrl";
import FaceBook from "../SnsIcon/FaceBook";
import Kakao from "../SnsIcon/Kakao";
import NaverBlog from "../SnsIcon/NaverBlog";
import LineDiv from "./LineDiv";
import styled, { css } from "styled-components";
import KakaoStory from "../SnsIcon/KakaoStory";
import { Debounce } from "../Debounce";
//SNS공유하기
const BtnCss = css`
  border: 0;
  outline: 0;
  width: 50px;
  height: 50px;
  padding-top: 5px;
  cursor: pointer;
`;
const Button = styled.button`
  background: ${(props) => props.color};
  ${BtnCss}
`;

const LeftButton = styled.button`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${(props) => props.color};
  ${BtnCss}
`;

const RightButton = styled.button`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${(props) => props.color};
  ${BtnCss}
`;
const HiddenTextArea = styled.textarea`
  opacity: 0;
  position: absolute;
  left: -999px;
  top: -999px;
`;
const ToastMsg = styled.p`
  color: gray;
  transition: all ease-out 0.3s;
  opacity: 0;
  position: relative;
  font-size: 0.9em;
`;

const SnsGroup = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init("a80efbd3b98c1eb5db9344a5b1289b50");
    //공유할 때 썸네일에 결과만 공유하고 접속은 테스트하는 페이지로 넘기기 위해서(동적으로 썸네일이 안바뀌기 때문에), url에 리다이렉트 함수를 넣어둔 페이지의 url을 넣어준다.

    // 카카오톡 공유

    window.Kakao.Link.createDefaultButton({
      container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: "로또 맛있게 하는 집 - 로또맛집",
        description: "실제같은 가상로또부터 천만개가 넘는 로또데이터까지",
        imageUrl: "https://lottozip.site/Thumbnail1.png",
        imageWidth: 800,
        imageHeight: 400,
        link: {
          mobileWebUrl: "https://lottozip.site",
          webUrl: "https://lottozip.site",
        },
      },
      buttons: [
        {
          title: "번호 뽑으러 가기",
          link: {
            mobileWebUrl: "https://lottozip.site",
            webUrl: "https://lottozip.site/",
          },
        },
      ],
    });
  }, []);

  var popupWidth = 500;
  var popupHeight = 500;
  var popupX = window.screen.width / 2 - popupWidth / 2;

  var popupY = window.screen.height / 2 - popupHeight / 2;
  var size =
    "status=no, height=" +
    popupHeight +
    ", width=" +
    popupWidth +
    ", left=" +
    popupX +
    ", top=" +
    popupY;
  var url = "https://lottozip.site";
  const facebook = Debounce(() => {
    window.open(
      "http://www.facebook.com/sharer/sharer.php?u=" + url,
      "name",
      size
    );
  }, 200);
  const kakaoStory = Debounce(() => {
    window.open("https://story.kakao.com/share?url=" + url, "name", size);
  }, 200);
  const naver = Debounce(() => {
    window.open(
      "http://share.naver.com/web/shareView.nhn?url=" + url + "&title=로또맛집",
      "name",
      size
    );
  }, 200);
  const urlCopy = Debounce(() => {
    var toast = document.getElementById("toast");
    toast.style.opacity = 1;
    var copyText = document.getElementById("copy");
    copyText.select();
    document.execCommand("Copy");
    copyText.blur();

    setTimeout(() => {
      toast.style.opacity = 0;
    }, 1500);
  }, 500);

  return (
    <div>
      <LineDiv content="공유하기"></LineDiv>
      <LeftButton onClick={facebook} color="rgb(224,230,251)">
        <FaceBook></FaceBook>
      </LeftButton>
      <Button onClick={kakaoStory} color="rgba(239, 219, 72, 0.48)">
        <KakaoStory></KakaoStory>
      </Button>
      <Button onClick={naver} color="rgba(87, 192, 79, 0.19)">
        <NaverBlog></NaverBlog>
      </Button>
      <Button id="kakao-link-btn" color="rgba(239, 219, 72, 0.48)">
        <Kakao></Kakao>
      </Button>
      <RightButton onClick={urlCopy} color="rgba(153, 153, 153, 0.19)">
        <CopyURL></CopyURL>
      </RightButton>
      <ToastMsg id="toast">클립보드에 주소가 복사되었습니다.</ToastMsg>
      <HiddenTextArea
        readOnly
        id="copy"
        value="https://lottozip.site"
      ></HiddenTextArea>
    </div>
  );
};

export default SnsGroup;
