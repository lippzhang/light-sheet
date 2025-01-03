import React, { useContext } from "react";
import { useDialog } from "./useDialog";
import { RightPanelContext } from "../context/rightPanel";
import WorkbookContext from "../context";

type showPanelValueType = {
  title?: string | React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  /*
   * tab 页面上的关闭按钮回调，为false 则不关闭
   * 返回 promise 则tab处于 loading 态
   */
  onClose?: () => undefined | boolean | Promise<boolean> | void;
  width?: number;
} | null;
export function useUIapi() {
  const { showDialog } = useDialog();
  const { setValue: setRightPanelValue } = useContext(RightPanelContext);
  const { setContext } = useContext(WorkbookContext);
  return {
    showModal: (content: string | React.ReactNode, type?: "ok" | "yesno") => {
      showDialog(content, type);
    },
    showRightPanel: (value: showPanelValueType) => {
      setRightPanelValue(value);
      setContext((draftCtx) => {
        draftCtx.rightPanelVisible = true;
        draftCtx.rightPanelWidth = value?.width || 0;
      });
    },
    hideRightPanel: () => {
      setContext((draftCtx) => {
        draftCtx.rightPanelVisible = false;
        draftCtx.rightPanelWidth = 0;
      });
    },
  };
}
