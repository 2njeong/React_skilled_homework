import React, { useContext } from "react";
import { FamilyContext } from "../../context/FamilyContext";
import { data } from "../../shared/data";
import {
  FanLetterStBox,
  AvatarStImg,
  LetterContentSt,
  LetterLiBtnContainerDiv,
  BriefNDetailBtn,
  LiStyle,
} from "../../style/LetterListStyle";

function HerLetterList({
  setClickedFanId,
  imgRef,
  seeFanData,
  goToDetailPage,
}) {
  const allData = useContext(FamilyContext);

  const herLetter = allData.selectedBtn
    ? allData.letterList.filter(
        (letter) => letter.writedTo === data[allData.selectedBtn - 1].name
      )
    : null;

  return herLetter.length > 0 ? (
    herLetter.map((letter) => {
      return (
        <FanLetterStBox key={letter.id}>
          <AvatarStImg
            src={letter.avatar}
            alt="avatar"
            onClick={() => {
              setClickedFanId(letter.id);
              seeFanData();
              // setClickedFanId(letter.id);
              // seeFanData(); 얘는 왜 한번의 렌더링으로 업데이트가 되지 않는지 꼭 튜터님께 물어보기
            }}
            ref={imgRef}
          ></AvatarStImg>
          <LetterContentSt>
            <LetterLiBtnContainerDiv>
              <div>
                <li>{letter.nickname}</li>
                <li>{letter.createdAt}</li>
                <li>To : {letter.writedTo}</li>
              </div>

              <BriefNDetailBtn onClick={() => goToDetailPage(letter.id)}>
                Edit N Delete
              </BriefNDetailBtn>
            </LetterLiBtnContainerDiv>

            <LiStyle>{letter.content}</LiStyle>
          </LetterContentSt>
        </FanLetterStBox>
      );
    })
  ) : (
    // 맴버 버튼은 클릭되었으나 해당 맴버에게 레더가 없는 경우
    <div>
      아직 🩷{data[allData.selectedBtn - 1].name}🩷 에게 남겨진 팬레터가 없습니다.
      펜레터를 작성해주세요. 성덕으로 가는 지름길..!
    </div>
  );
}

export default HerLetterList;
