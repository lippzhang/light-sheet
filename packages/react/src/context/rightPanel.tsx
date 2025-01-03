import React, { useState, useMemo } from "react";

type rightPanelValueType = {
  title?: string | React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  /*
   * tab 页面上的关闭按钮回调，为false 则不关闭
   * 返回 promise 则tab处于 loading 态
   */
  onClose?: () => undefined | boolean | Promise<boolean> | void;
} | null;
const RightPanelContext = React.createContext<{
  value: rightPanelValueType;
  setValue: React.Dispatch<React.SetStateAction<rightPanelValueType>>;
}>({
  value: null,
  setValue: () => {},
});

const RightPanelProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<rightPanelValueType>(null);
  const providerValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value]
  );

  return (
    <RightPanelContext.Provider value={providerValue}>
      {children}
    </RightPanelContext.Provider>
  );
};

export { RightPanelContext, RightPanelProvider };
