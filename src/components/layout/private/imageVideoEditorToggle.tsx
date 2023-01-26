import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ChangeUploadPopup } from "../../../pages/private/dashboard/workspace/ChangeUploadPopup";

const ToggleWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  height: 39px;
  margin: 14px 13px 13px;
  border: 1px solid #dde6ff;
  border-radius: 5px;
  overflow: hidden;
  width: 348px;
  font-size: 16px solid;
  font-family: "Lato", sans-serif;
`;

const ToggleWrapperBtn = styled.button`
  color: #f0ecf5;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out;
  border: 0 none;
  flex: 1;
  padding: 0;
  position: relative;
  font-size: 1em;
  height: 36px;
  margin-top: 2px;
  margin-right: 3px;
  margin-left: 2px;
  border-radius: 4px;
  cursor: pointer;
`;

const ToggleWrapperBtnSpan = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1em;
  font-family: "Lato", sans-serif;
`;

export const ImageVideoEditorToggle = (props: any) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [canvasObj, setCanvasObj] = useState<Array<any>>([]);
  const location: any = useLocation();
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => {
    return state.canvas;
  });
  const handleChangeUploadClose = () => {
    setShowPopup(!showPopup);
  };
  const toSave = useSelector((state: any) => {
    return state.toSave;
  });

  const compositionId = useSelector((state: any) => {
    console.log(state);
    return state.compositionId;
  });

  useEffect(() => {
    if (location.state && location.state.editor) {
      props.setActiveEditor(location.state.editor);
    }
  }, [location]);

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => {
        setCanvasObj(canvas.getObjects());
        console.log("canvasObjInToggle", canvas.getObjects());
      });
      canvas.on("object:removed", () => {
        setCanvasObj(canvas.getObjects());
        console.log("canvasObjInToggle", canvas.getObjects());
      });
    }
  }, [canvas]);

  const videoToggle = () => {
    console.log(compositionId);
    if (canvasObj.length > 1 && !compositionId) {
      setShowPopup(true);
      return;
    }
    props.setActiveEditor("video");
  };
  const imageToggle = () => {
    console.log(compositionId);
    if (canvasObj.length > 1 && !compositionId) {
      setShowPopup(true);
      return;
    }
    props.setActiveEditor("image");
  };

  const confirmation = (btn: any) => {
    if (btn === "discard") {
      setShowPopup(false);
      props.activeEditor === "video"
        ? props.setActiveEditor("image")
        : props.setActiveEditor("video");
      setCanvasObj([]);
    }
    if (btn === "save") {
      dispatch({
        type: "toSave",
        toSave: true,
      });
    }
  };

  useEffect(() => {
    if (toSave) {
      props.setActiveEditor("video");
      setShowPopup(false);
    }
  }, [toSave]);

  return (
    <>
      <ToggleWrapper>
        <ToggleWrapperBtn
          onClick={videoToggle}
          className={props.activeEditor === "video" ? "activeEditorBtn" : ""}
        >
          <ToggleWrapperBtnSpan>Video Editor</ToggleWrapperBtnSpan>
        </ToggleWrapperBtn>
        {showPopup && (
          <ChangeUploadPopup
            confirmation={confirmation}
            handleClose={handleChangeUploadClose}
          />
        )}
        <ToggleWrapperBtn
          onClick={imageToggle}
          className={props.activeEditor === "image" ? "activeEditorBtn" : ""}
        >
          <ToggleWrapperBtnSpan>Image Editor</ToggleWrapperBtnSpan>
        </ToggleWrapperBtn>
      </ToggleWrapper>
      {showPopup && (
        <ChangeUploadPopup
          confirmation={confirmation}
          handleClose={handleChangeUploadClose}
        />
      )}
    </>
  );
};
