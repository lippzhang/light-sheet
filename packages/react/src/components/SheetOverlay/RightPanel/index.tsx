import React, { useContext } from "react";
import WorkbookContext from "../../../context";
import SVGIcon from "../../SVGIcon";
import "./index.css";

type IRightPanelConfig = {
  //   type?: "default";
  // tab标题
  title?: string | React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  /*
   * tab 页面上的关闭按钮回调，为false 则不关闭
   * 返回 promise 则tab处于 loading 态
   */
  onClose?: () => undefined | boolean | Promise<boolean> | void;
};
const RightPanel: React.FC<IRightPanelConfig> = ({
  title,
  content,
  footer,
  width = 120,
  onClose,
}) => {
  const { setContext } = useContext(WorkbookContext);
  function handleClose() {
    setContext((draftCtx) => {
      draftCtx.rightPanelVisible = false;
      draftCtx.rightPanelWidth = 0;
    });
    onClose?.();
  }
  return (
    <section
      className="fortune-sheet-sidebar"
      style={{ width, height: "100%" }}
    >
      <header className="fortune-sheet-sidebar-header">
        {title}
        <div onClick={handleClose}>
          <SVGIcon name="close" style={{ padding: 7, cursor: "pointer" }} />
        </div>
      </header>

      <section className="fortune-sheet-sidebar-content">{content}</section>

      {footer && (
        <footer className="fortune-sheet-sidebar-footer">{footer}</footer>
      )}
    </section>
  );
};

export default RightPanel;
