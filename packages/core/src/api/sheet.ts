import _ from "lodash";
import { getSheet } from "./common";
import { Context } from "../context";
import { CellMatrix, CellWithRowAndCol, Sheet } from "../types";
import { getSheetIndex } from "../utils";

export function getAllSheets(ctx: Context) {
  return ctx.luckysheetfile;
}

export { getSheet };

export function initSheetData(
  draftCtx: Context,
  index: number,
  newData: Sheet
): CellMatrix | null {
  const { celldata, row, column } = newData;
  const lastRow = _.maxBy<CellWithRowAndCol>(celldata, "r");
  const lastCol = _.maxBy(celldata, "c");
  let lastRowNum = (lastRow?.r ?? 0) + 1;
  let lastColNum = (lastCol?.c ?? 0) + 1;
  if (row != null && column != null && row > 0 && column > 0) {
    lastRowNum = Math.max(lastRowNum, row);
    lastColNum = Math.max(lastColNum, column);
  } else {
    lastRowNum = Math.max(lastRowNum, draftCtx.defaultrowNum);
    lastColNum = Math.max(lastColNum, draftCtx.defaultcolumnNum);
  }
  if (lastRowNum && lastColNum) {
    const expandedData: Sheet["data"] = _.times(lastRowNum, () =>
      _.times(lastColNum, () => null)
    );
    celldata?.forEach((d) => {
      expandedData[d.r][d.c] = d.v;
    });
    if (draftCtx.luckysheetfile[index] == null) {
      newData.data = expandedData;
      draftCtx.luckysheetfile.push(newData);
    } else {
      draftCtx.luckysheetfile[index].data = expandedData;
    }
    return expandedData;
  }
  return null;
}

export function hideSheet(ctx: Context, sheetId: string) {
  const index = getSheetIndex(ctx, sheetId) as number;
  ctx.luckysheetfile[index].hide = 1;
  ctx.luckysheetfile[index].status = 0;
  const shownSheets = ctx.luckysheetfile.filter(
    (sheet) => _.isUndefined(sheet.hide) || sheet?.hide !== 1
  );
  ctx.currentSheetId = shownSheets[0].id as string;
}

export function showSheet(ctx: Context, sheetId: string) {
  const index = getSheetIndex(ctx, sheetId) as number;
  ctx.luckysheetfile[index].hide = undefined;
}
