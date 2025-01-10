import React, { useState, useCallback, useRef } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Sheet } from "@light-sheet/core";
import { Workbook, type WorkbookInstance } from "@light-sheet/react";

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
      <Workbook
        ref={workbookRef}
        {...args}
        data={data}
        cellContextMenu={[
          "copy",
          "insert-row",
          "|",
          [
            {
              type: "cell",
              label: "自定义菜单",
              onClick: () => {
                console.log("自定义菜单");
              },
            },
            {
              type: "cell",
              label: "自定义菜单2",
              onClick: () => {
                console.log("自定义菜单2");
              },
            },
          ],
        ]}
        headerContextMenu={[
          [
            {
              type: "cell",
              label: "自定义菜单",
              onClick: () => {
                console.log("自定义菜单");
              },
            },
            {
              type: "cell",
              label: "自定义菜单2",
              onClick: () => {
                console.log("自定义菜单2");
              },
            },
          ],
        ]}
        sheetTabContextMenu={[
          [
            {
              type: "cell",
              label: "自定义菜单",
              onClick: () => {
                console.log("自定义菜单");
              },
            },
            {
              type: "cell",
              label: "自定义菜单2",
              onClick: () => {
                console.log("自定义菜单2");
              },
            },
          ],
        ]}
        filterContextMenu={[
          [
            {
              type: "cell",
              label: "自定义菜单",
              onClick: () => {
                console.log("自定义菜单");
              },
            },
            {
              type: "cell",
              label: "自定义菜单2",
              onClick: () => {
                console.log("自定义菜单2");
              },
            },
          ],
        ]}
        onChange={onChange}
      />
    </div>
  );
};

export const Basic = Template.bind({});
// @ts-ignore
Basic.args = {
  data: [
    {
      name: "Sheet1",
    },
  ],
};
