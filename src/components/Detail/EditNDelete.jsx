import { data } from "../../shared/data";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { selectClick } from "../../redux/modules/selectedBtnReducer";
import { editNdeleteLetterList } from "../../redux/modules/letterListReducer";
import {
  clickChangeTrue,
  clickChangeFalse,
} from "../../redux/modules/clickReducer";
import {
  WholeDetailbackground,
  DetailImgStBox,
  DetailStBox,
  GoBackToListBtn,
  DetailDiv,
  DetailInsideDiv1,
  DetailInsideDiv2,
  DetailBtnDiv,
  DetailBtn,
  DetailAvatarImg,
  DetailNicknameP,
  DetailWriteToP,
  DetailP,
  DetailEditArea,
  DetailEditPArea,
} from "../../style/DetailStyle";

function EditNDelete() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const textAreaRef = useRef(null);
  const click = useSelector((state) => state.clickReducer.click);
  const letterList = useSelector((state) => state.letterListReducer.letterList);
  const foundLetter = letterList.find((letter) => letter.id === params.id);

  // - 수정하기를 완료하지 않고 뒤로가기를 한 후, 다시 수정하기로 들어오면 화면 초기화시키기
  useEffect(() => {
    dispatch(clickChangeFalse());
  }, [dispatch]);

  const [editContent, setEditContent] = useState(foundLetter.content);

  let restLetterList = letterList.filter(
    (letter) => letter.id !== foundLetter.id
  );

  const goBackBtndata = data.find((d) => d.name === foundLetter.writedTo);

  const askEditHandelert = () => {
    alert("수정하시겠습니까?");
    dispatch(clickChangeTrue());
  };

  // - textArea에 다른 컴포넌트들이 다 렌더링된 후, textArea focus() 하기
  useEffect(() => {
    if (textAreaRef.current && click) {
      textAreaRef.current.focus();
    }
  });

  const renewContent = (e) => {
    setEditContent(e.target.value);
  };

  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  const editHandeler = () => {
    if (editContent === foundLetter.content) {
      alert("수정된 내용이 없습니다.");
      dispatch(clickChangeTrue());
    } else {
      alert("수정이 완료되었습니다.");
      dispatch(clickChangeFalse());
      dispatch(
        editNdeleteLetterList([
          ...restLetterList,
          {
            ...foundLetter,
            content: editContent,
            createdAt: String(new Date(utc + koreaTimeDiff)),
          },
        ])
      );

      // foundletter.content = editcontent
      // dispatch(editNdeleteLetterList(...restLetyterList, foundLetter)); --- 리듀서에서 [action.payload]로 받기 => 실패
      // dispatch(editNdeleteLetterList([...restLetyterList, foundLetter])) --- 리듀서에서 action.payload로 받기 => 성공
      // 왜지??
    }
  };

  const deleteHandeler = () => {
    if (
      window.confirm(
        `${foundLetter.writedTo}에게 쓰신 펜레터를 정말 삭제하시겠습니까?`
      )
    ) {
      dispatch(clickChangeFalse());
      dispatch(editNdeleteLetterList([...restLetterList]));
      alert("삭제되었습니다.");
      dispatch(selectClick(goBackBtndata.id));
      navigate("/");
    }
  };

  const goBackToLetterList = () => {
    dispatch(selectClick(goBackBtndata.id));
    navigate("/");
  };

  return (
    <WholeDetailbackground>
      <DetailImgStBox>
        <DetailStBox>
          <GoBackToListBtn onClick={goBackToLetterList}>
            🩶팬레터 목록으로 돌아가고 싶다면 여기를 클릭해주세요🖤
          </GoBackToListBtn>
          {/* ------------------------------------------------------------ */}
          <DetailDiv>
            <DetailInsideDiv1>
              <DetailAvatarImg src={foundLetter.avatar} alt="avartar" />
              <DetailNicknameP>{foundLetter.nickname}</DetailNicknameP>
            </DetailInsideDiv1>
            <DetailInsideDiv2>
              <DetailBtnDiv>
                <DetailBtn onClick={click ? editHandeler : askEditHandelert}>
                  {click ? "수정완료" : "수정"}
                </DetailBtn>
                <DetailBtn onClick={deleteHandeler}>삭제</DetailBtn>
              </DetailBtnDiv>
              <DetailP>{foundLetter.createdAt}</DetailP>
            </DetailInsideDiv2>
          </DetailDiv>
          <DetailWriteToP>To : {foundLetter.writedTo}</DetailWriteToP>
          {/* ------------------------------------------------------------ */}
          {click ? (
            <DetailEditArea
              value={editContent}
              onChange={renewContent}
              ref={textAreaRef}
            >
              {foundLetter.content}
            </DetailEditArea>
          ) : (
            <DetailEditPArea>{foundLetter.content}</DetailEditPArea>
          )}
        </DetailStBox>
      </DetailImgStBox>
    </WholeDetailbackground>
  );
}

export default EditNDelete;
