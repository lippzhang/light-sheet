import React, { useState, useCallback, useRef } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Sheet } from "@fortune-sheet/core";
import { Workbook, type WorkbookInstance } from "@fortune-sheet/react";
import cell from "./data/cell";

export default {
  component: Workbook,
} as Meta<typeof Workbook>;

const Template: StoryFn<typeof Workbook> = ({
  // eslint-disable-next-line react/prop-types
  data: data0,
  ...args
}) => {
  const [data, setData] = useState<Sheet[]>(data0);
  const workbookRef = useRef<WorkbookInstance>(null);
  const onChange = useCallback((d: Sheet[]) => {
    setData(d);
  }, []);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button
        type="button"
        onClick={() => {
          if (workbookRef && workbookRef.current) {
            workbookRef.current.layout?.showModal("aaaa", "ok");
          }
        }}
      >
        showModal
      </button>
      <Workbook ref={workbookRef} {...args} data={data} onChange={onChange} />
    </div>
  );
};

export const Basic = Template.bind({});
// @ts-ignore
Basic.args = { data: [cell] };
