import _ from "lodash";
import type { Sheet as SheetType } from "@fortune-sheet/core/src/types";
import { Context, getFlowdata } from "../context";
import { getCellValue, getStyleByCell, mergeBorder } from "./cell";
import { delFunctionGroup, formulaCache } from "./formula";
import clipboard from "./clipboard";
import { getBorderInfoCompute } from "./border";
import { getSheetIndex, replaceHtml } from "../utils";
import { hasPartMC } from "./validation";
import locale from "../locale";

export const selectionCache = {
  isPasteAction: false,
};

export function normalizeSelection(
  ctx: Context,
  selection: SheetType["luckysheet_select_save"]
) {
  if (!selection) return selection;

  const flowdata = getFlowdata(ctx);
  if (!flowdata) return selection;

  for (let i = 0; i < selection.length; i += 1) {
    const r1 = selection[i].row[0];
    const r2 = selection[i].row[1];
    const c1 = selection[i].column[0];
    const c2 = selection[i].column[1];

    let rf;
    let cf;
    if (_.isNil(selection[i].row_focus)) {
      rf = r1;
    } else {
      rf = selection[i].row_focus;
    }

    if (_.isNil(selection[i].column_focus)) {
      cf = c1;
    } else {
      cf = selection[i].column_focus;
    }

    if (_.isNil(rf) || _.isNil(cf)) {
      console.error("normalizeSelection: rf and cf is nil");
      return selection;
    }

    const row = ctx.visibledatarow[r2];
    const row_pre = r1 - 1 === -1 ? 0 : ctx.visibledatarow[r1 - 1];
    const col = ctx.visibledatacolumn[c2];
    const col_pre = c1 - 1 === -1 ? 0 : ctx.visibledatacolumn[c1 - 1];

    let row_f = ctx.visibledatarow[rf];
    let row_pre_f = rf - 1 === -1 ? 0 : ctx.visibledatarow[rf - 1];
    let col_f = ctx.visibledatacolumn[cf];
    let col_pre_f = cf - 1 === -1 ? 0 : ctx.visibledatacolumn[cf - 1];

    const margeset = mergeBorder(ctx, flowdata, rf, cf);
    if (margeset) {
      [row_pre_f, row_f] = margeset.row;
      [col_pre_f, col_f] = margeset.column;
    }

    selection[i].row = [r1, r2];
    selection[i].column = [c1, c2];

    selection[i].row_focus = rf;
    selection[i].column_focus = cf;

    selection[i].left = col_pre_f;
    selection[i].width = col_f - col_pre_f - 1;
    selection[i].top = row_pre_f;
    selection[i].height = row_f - row_pre_f - 1;

    selection[i].left_move = col_pre;
    selection[i].width_move = col - col_pre - 1;
    selection[i].top_move = row_pre;
    selection[i].height_move = row - row_pre - 1;
  }
  return selection;
}

export function selectTitlesMap(
  rangeMap: Record<string, number>,
  range1: number,
  range2: number
) {
  const map: Record<string, number> = rangeMap || {};
  for (let i = range1; i <= range2; i += 1) {
    if (i in map) {
      continue;
    }
    map[i] = 0;
  }
  return map;
}

export function selectTitlesRange(map: Record<string, number>) {
  const mapArr = Object.keys(map).map(Number);

  mapArr.sort((a, b) => {
    return a - b;
  });

  let rangeArr: number[][] | undefined;
  let item = [];

  if (mapArr.length > 1) {
    rangeArr = [];
    for (let j = 1; j < mapArr.length; j += 1) {
      if (mapArr[j] - mapArr[j - 1] === 1) {
        item.push(mapArr[j - 1]);

        if (j === mapArr.length - 1) {
          item.push(mapArr[j]);
          rangeArr.push(item);
        }
      } else {
        if (j === 1) {
          if (j === mapArr.length - 1) {
            item.push(mapArr[j - 1]);
            rangeArr.push(item);
            rangeArr.push([mapArr[j]]);
          } else {
            rangeArr.push([mapArr[0]]);
          }
        } else if (j === mapArr.length - 1) {
          item.push(mapArr[j - 1]);
          rangeArr.push(item);
          rangeArr.push([mapArr[j]]);
        } else {
          item.push(mapArr[j - 1]);
          rangeArr.push(item);
          item = [];
        }
      }
    }
  } else {
    rangeArr = [];
    rangeArr.push([mapArr[0]]);
  }

  return rangeArr;
}

export function moveHighlightCell(
  ctx: Context,
  postion: "down" | "right",
  index: number,
  type: "rangeOfSelect" | "rangeOfFormula"
) {
  const flowdata = getFlowdata(ctx);
  if (!flowdata) return;
  const datarowlen = flowdata.length;
  const datacolumnlen = flowdata[0].length;

  let row;
  let row_pre;
  let row_index;
  let row_index_ed;
  let col;
  let col_pre;
  let col_index;
  let col_index_ed;

  if (type === "rangeOfSelect") {
    const last =
      ctx.luckysheet_select_save?.[ctx.luckysheet_select_save.length - 1];
    if (!last) {
      console.error("moveHighlightCell: no selection found");
      return;
    }

    let curR;
    if (_.isNil(last.row_focus)) {
      [curR] = last.row;
    } else {
      curR = last.row_focus;
    }

    let curC;
    if (_.isNil(last.column_focus)) {
      [curC] = last.column;
    } else {
      curC = last.column_focus;
    }

    // focus单元格 是否是合并单元格
    const margeset = mergeBorder(ctx, flowdata, curR, curC);
    if (margeset) {
      const str_r = margeset.row[2];
      const end_r = margeset.row[3];

      const str_c = margeset.column[2];
      const end_c = margeset.column[3];

      if (index > 0) {
        if (postion === "down") {
          curR = end_r;
          curC = str_c;
        } else if (postion === "right") {
          curR = str_r;
          curC = end_c;
        }
      } else {
        curR = str_r;
        curC = str_c;
      }
    }

    if (_.isNil(curR) || _.isNil(curC)) {
      console.error("moveHighlightCell: curR or curC is nil");
      return;
    }

    let moveX = _.isNil(last.moveXY) ? curR : last.moveXY.x;
    let moveY = _.isNil(last.moveXY) ? curC : last.moveXY.y;

    if (postion === "down") {
      curR += index;
      moveX = curR;
    } else if (postion === "right") {
      curC += index;
      moveY = curC;
    }

    if (curR >= datarowlen) {
      curR = datarowlen - 1;
      moveX = curR;
    }

    if (curR < 0) {
      curR = 0;
      moveX = curR;
    }

    if (curC >= datacolumnlen) {
      curC = datacolumnlen - 1;
      moveY = curC;
    }

    if (curC < 0) {
      curC = 0;
      moveY = curC;
    }

    // 移动的下一个单元格是否是合并的单元格
    const margeset2 = mergeBorder(ctx, flowdata, curR, curC);
    if (margeset2) {
      [row_pre, row, row_index, row_index_ed] = margeset2.row;
      [col_pre, col, col_index, col_index_ed] = margeset2.column;
    } else {
      row = ctx.visibledatarow[moveX];
      row_pre = moveX - 1 === -1 ? 0 : ctx.visibledatarow[moveX - 1];
      // row_index = moveX;
      // row_index_ed = moveX;

      col = ctx.visibledatacolumn[moveY];
      col_pre = moveY - 1 === -1 ? 0 : ctx.visibledatacolumn[moveY - 1];
      // col_index = moveY;
      // col_index_ed = moveY;

      row_index = curR;
      row_index_ed = curR;
      col_index = curC;
      col_index_ed = curC;
    }

    if (
      _.isNil(row_index) ||
      _.isNil(row_index_ed) ||
      _.isNil(col_index) ||
      _.isNil(col_index_ed)
    ) {
      console.error(
        "moveHighlightCell: row_index or row_index_ed or col_index or col_index_ed is nil"
      );
      return;
    }

    last.row = [row_index, row_index_ed];
    last.column = [col_index, col_index_ed];
    last.row_focus = row_index;
    last.column_focus = col_index;
    last.moveXY = { x: moveX, y: moveY };

    normalizeSelection(ctx, ctx.luckysheet_select_save);
    // TODO pivotTable.pivotclick(row_index, col_index);
    // TODO formula.fucntionboxshow(row_index, col_index);
  } else if (type === "rangeOfFormula") {
    const last = formulaCache.func_selectedrange;

    let curR;
    if (_.isNil(last.row_focus)) {
      [curR] = last.row;
    } else {
      curR = last.row_focus;
    }

    let curC;
    if (_.isNil(last.column_focus)) {
      [curC] = last.column;
    } else {
      curC = last.column_focus;
    }

    // focus单元格 是否是合并单元格
    const margeset = mergeBorder(ctx, flowdata, curR, curC);
    if (margeset) {
      const str_r = margeset.row[2];
      const end_r = margeset.row[3];

      const str_c = margeset.column[2];
      const end_c = margeset.column[3];

      if (index > 0) {
        if (postion === "down") {
          curR = end_r;
          curC = str_c;
        } else if (postion === "right") {
          curR = str_r;
          curC = end_c;
        }
      } else {
        curR = str_r;
        curC = str_c;
      }
    }

    if (_.isNil(curR) || _.isNil(curC)) {
      console.error("moveHighlightCell: curR or curC is nil");
      return;
    }

    let moveX = _.isNil(last.moveXY) ? curR : last.moveXY.x;
    let moveY = _.isNil(last.moveXY) ? curC : last.moveXY.y;

    if (postion === "down") {
      curR += index;
      moveX = curR;
    } else if (postion === "right") {
      curC += index;
      moveY = curC;
    }

    if (curR >= datarowlen) {
      curR = datarowlen - 1;
      moveX = curR;
    }

    if (curR < 0) {
      curR = 0;
      moveX = curR;
    }

    if (curC >= datacolumnlen) {
      curC = datacolumnlen - 1;
      moveY = curC;
    }

    if (curC < 0) {
      curC = 0;
      moveY = curC;
    }

    // 移动的下一个单元格是否是合并的单元格
    const margeset2 = mergeBorder(ctx, flowdata, curR, curC);
    if (margeset2) {
      [row_pre, row, row_index, row_index_ed] = margeset2.row;
      [col_pre, col, col_index, col_index_ed] = margeset2.column;
    } else {
      row = ctx.visibledatarow[moveX];
      row_pre = moveX - 1 === -1 ? 0 : ctx.visibledatarow[moveX - 1];
      row_index = moveX;
      row_index_ed = moveX;

      col = ctx.visibledatacolumn[moveY];
      col_pre = moveY - 1 === -1 ? 0 : ctx.visibledatacolumn[moveY - 1];
      col_index = moveY;
      col_index_ed = moveY;
    }

    if (
      _.isNil(col) ||
      _.isNil(col_pre) ||
      _.isNil(row) ||
      _.isNil(row_pre) ||
      _.isNil(row_index) ||
      _.isNil(row_index_ed) ||
      _.isNil(col_index) ||
      _.isNil(col_index_ed)
    ) {
      console.error(
        "moveHighlightCell: some values of func_selectedrange is nil"
      );
      return;
    }

    formulaCache.func_selectedrange = {
      left: col_pre,
      width: col - col_pre - 1,
      top: row_pre,
      height: row - row_pre - 1,
      left_move: col_pre,
      width_move: col - col_pre - 1,
      top_move: row_pre,
      height_move: row - row_pre - 1,
      row: [row_index, row_index_ed],
      column: [col_index, col_index_ed],
      row_focus: row_index,
      column_focus: col_index,
      moveXY: { x: moveX, y: moveY },
    };

    // $("#luckysheet-formula-functionrange-select")
    //   .css({
    //     left: col_pre,
    //     width: col - col_pre - 1,
    //     top: row_pre,
    //     height: row - row_pre - 1,
    //   })
    //   .show();

    // formula.rangeSetValue({
    //   row: [row_index, row_index_ed],
    //   column: [col_index, col_index_ed],
    // });
  }

  /*
  const scrollLeft = $("#luckysheet-cell-main").scrollLeft();
  const scrollTop = $("#luckysheet-cell-main").scrollTop();
  const winH = $("#luckysheet-cell-main").height();
  const winW = $("#luckysheet-cell-main").width();

  let sleft = 0;
  let stop = 0;
  if (col - scrollLeft - winW + 20 > 0) {
    sleft = col - winW + 20;
    if (isScroll) {
      $("#luckysheet-scrollbar-x").scrollLeft(sleft);
    }
  } else if (col_pre - scrollLeft - 20 < 0) {
    sleft = col_pre - 20;
    if (isScroll) {
      $("#luckysheet-scrollbar-x").scrollLeft(sleft);
    }
  }

  if (row - scrollTop - winH + 20 > 0) {
    stop = row - winH + 20;
    if (isScroll) {
      $("#luckysheet-scrollbar-y").scrollTop(stop);
    }
  } else if (row_pre - scrollTop - 20 < 0) {
    stop = row_pre - 20;
    if (isScroll) {
      $("#luckysheet-scrollbar-y").scrollTop(stop);
    }
  }

  clearTimeout(ctx.countfuncTimeout);
  countfunc();
  */

  // 移动单元格通知后台
  // server.saveParam("mv", ctx.currentSheetIndex, ctx.luckysheet_select_save);
}

function getHtmlBorderStyle(type: string, color: string) {
  let style = "";
  const borderType: any = {
    "0": "none",
    "1": "Thin",
    "2": "Hair",
    "3": "Dotted",
    "4": "Dashed",
    "5": "DashDot",
    "6": "DashDotDot",
    "7": "Double",
    "8": "Medium",
    "9": "MediumDashed",
    "10": "MediumDashDot",
    "11": "MediumDashDotDot",
    "12": "SlantedDashDot",
    "13": "Thick",
  };
  type = borderType[type.toString()];

  if (type.indexOf("Medium") > -1) {
    style += "1pt ";
  } else if (type === "Thick") {
    style += "1.5pt ";
  } else {
    style += "0.5pt ";
  }

  if (type === "Hair") {
    style += "double ";
  } else if (type.indexOf("DashDotDot") > -1) {
    style += "dotted ";
  } else if (type.indexOf("DashDot") > -1) {
    style += "dashed ";
  } else if (type.indexOf("Dotted") > -1) {
    style += "dotted ";
  } else if (type.indexOf("Dashed") > -1) {
    style += "dashed ";
  } else {
    style += "solid ";
  }

  return `${style + color};`;
}

export function copy(ctx: Context) {
  // copy事件
  const flowdata = getFlowdata(ctx);

  ctx.luckysheet_selection_range = [];
  // copy范围
  const rowIndexArr: number[] = [];
  const colIndexArr: number[] = [];
  const copyRange = [];
  let RowlChange = false;
  let HasMC = false;

  for (let s = 0; s < (ctx.luckysheet_select_save?.length ?? 0); s += 1) {
    const range = ctx.luckysheet_select_save![s];

    const r1 = range.row[0];
    const r2 = range.row[1];
    const c1 = range.column[0];
    const c2 = range.column[1];

    for (let copyR = r1; copyR <= r2; copyR += 1) {
      if (
        !_.isNil(ctx.config.rowhidden) &&
        !_.isNil(ctx.config.rowhidden[copyR])
      ) {
        continue;
      }

      if (!rowIndexArr.includes(copyR)) {
        rowIndexArr.push(copyR);
      }

      if (!_.isNil(ctx.config.rowlen) && copyR in ctx.config.rowlen) {
        RowlChange = true;
      }

      for (let copyC = c1; copyC <= c2; copyC += 1) {
        if (
          !_.isNil(ctx.config.colhidden) &&
          !_.isNil(ctx.config.colhidden[copyC])
        ) {
          continue;
        }

        if (!colIndexArr.includes(copyC)) {
          colIndexArr.push(copyC);
        }

        const cell = flowdata?.[copyR]?.[copyC];

        if (!_.isNil(cell?.mc?.rs)) {
          HasMC = true;
        }
      }
    }

    ctx.luckysheet_selection_range.push({
      row: range.row,
      column: range.column,
    });
    copyRange.push({ row: range.row, column: range.column });
  }

  // selectionCopyShow();

  // luckysheet内copy保存
  ctx.luckysheet_copy_save = {
    dataSheetIndex: ctx.currentSheetIndex,
    copyRange,
    RowlChange,
    HasMC,
  };

  // copy范围数据拼接成table 赋给剪贴板

  let borderInfoCompute;
  if (ctx.config.borderInfo && ctx.config.borderInfo.length > 0) {
    // 边框
    borderInfoCompute = getBorderInfoCompute(ctx);
  }

  let cpdata = "";
  const d = getFlowdata(ctx);
  if (!d) return;

  let colgroup = "";

  // rowIndexArr = rowIndexArr.sort();
  // colIndexArr = colIndexArr.sort();

  for (let i = 0; i < rowIndexArr.length; i += 1) {
    const r = rowIndexArr[i];

    if (!_.isNil(ctx.config.rowhidden) && !_.isNil(ctx.config.rowhidden[r])) {
      continue;
    }

    cpdata += "<tr>";

    for (let j = 0; j < colIndexArr.length; j += 1) {
      const c = colIndexArr[j];

      if (!_.isNil(ctx.config.colhidden) && !_.isNil(ctx.config.colhidden[c])) {
        continue;
      }

      // eslint-disable-next-line no-template-curly-in-string
      let column = '<td ${span} style="${style}">';

      if (!_.isNil(d[r]) && !_.isNil(d[r][c])) {
        let style = "";
        let span = "";

        if (r === rowIndexArr[0]) {
          if (
            _.isNil(ctx.config) ||
            _.isNil(ctx.config.columnlen) ||
            _.isNil(ctx.config.columnlen[c.toString()])
          ) {
            colgroup += '<colgroup width="72px"></colgroup>';
          } else {
            colgroup += `<colgroup width="${
              ctx.config.columnlen[c.toString()]
            }px"></colgroup>`;
          }
        }

        if (c === colIndexArr[0]) {
          if (
            _.isNil(ctx.config) ||
            _.isNil(ctx.config.rowlen) ||
            _.isNil(ctx.config.rowlen[r.toString()])
          ) {
            style += "height:19px;";
          } else {
            style += `height:${ctx.config.rowlen[r.toString()]}px;`;
          }
        }

        const reg = /^(w|W)((0?)|(0\.0+))$/;
        let c_value;
        if (
          !_.isNil(d[r][c].ct) &&
          !_.isNil(d[r][c].ct.fa) &&
          d[r][c].ct.fa.match(reg)
        ) {
          c_value = getCellValue(r, c, d);
        } else {
          c_value = getCellValue(r, c, d, "m");
        }

        const styleObj = getStyleByCell(d, r, c);
        style += _.map(styleObj, (v, key) => {
          return `${_.kebabCase(key)}:${_.isNumber(v) ? `${v}px` : v};`;
        }).join("");

        if (d[r]?.[c]?.mc) {
          if ("rs" in d[r][c].mc) {
            span = `rowspan="${d[r][c].mc.rs}" colspan="${d[r][c].mc.cs}"`;

            // 边框
            if (borderInfoCompute && borderInfoCompute[`${r}_${c}`]) {
              const bl_obj = { color: {}, style: {} };
              const br_obj = { color: {}, style: {} };
              const bt_obj = { color: {}, style: {} };
              const bb_obj = { color: {}, style: {} };

              for (let bd_r = r; bd_r < r + d[r][c].mc.rs; bd_r += 1) {
                for (let bd_c = c; bd_c < c + d[r][c].mc.cs; bd_c += 1) {
                  if (
                    bd_r === r &&
                    borderInfoCompute[`${bd_r}_${bd_c}`] &&
                    borderInfoCompute[`${bd_r}_${bd_c}`].t
                  ) {
                    const linetype =
                      borderInfoCompute[`${bd_r}_${bd_c}`].t.style;
                    const bcolor = borderInfoCompute[`${bd_r}_${bd_c}`].t.color;

                    if (_.isNil(bt_obj.style[linetype])) {
                      bt_obj.style[linetype] = 1;
                    } else {
                      bt_obj.style[linetype] = bt_obj.style[linetype] + 1;
                    }

                    if (_.isNil(bt_obj.color[bcolor])) {
                      bt_obj.color[bcolor] = 1;
                    } else {
                      bt_obj.color[bcolor] = bt_obj.color[bcolor] + 1;
                    }
                  }

                  if (
                    bd_r === r + d[r][c].mc.rs - 1 &&
                    borderInfoCompute[`${bd_r}_${bd_c}`] &&
                    borderInfoCompute[`${bd_r}_${bd_c}`].b
                  ) {
                    const linetype =
                      borderInfoCompute[`${bd_r}_${bd_c}`].b.style;
                    const bcolor = borderInfoCompute[`${bd_r}_${bd_c}`].b.color;

                    if (_.isNil(bb_obj.style[linetype])) {
                      bb_obj.style[linetype] = 1;
                    } else {
                      bb_obj.style[linetype] = bb_obj.style[linetype] + 1;
                    }

                    if (_.isNil(bb_obj.color[bcolor])) {
                      bb_obj.color[bcolor] = 1;
                    } else {
                      bb_obj.color[bcolor] = bb_obj.color[bcolor] + 1;
                    }
                  }

                  if (
                    bd_c === c &&
                    borderInfoCompute[`${bd_r}_${bd_c}`] &&
                    borderInfoCompute[`${bd_r}_${bd_c}`].l
                  ) {
                    const linetype = borderInfoCompute[`${r}_${c}`].l.style;
                    const bcolor = borderInfoCompute[`${bd_r}_${bd_c}`].l.color;

                    if (_.isNil(bl_obj.style[linetype])) {
                      bl_obj.style[linetype] = 1;
                    } else {
                      bl_obj.style[linetype] = bl_obj.style[linetype] + 1;
                    }

                    if (_.isNil(bl_obj.color[bcolor])) {
                      bl_obj.color[bcolor] = 1;
                    } else {
                      bl_obj.color[bcolor] = bl_obj.color[bcolor] + 1;
                    }
                  }

                  if (
                    bd_c === c + d[r][c].mc.cs - 1 &&
                    borderInfoCompute[`${bd_r}_${bd_c}`] &&
                    borderInfoCompute[`${bd_r}_${bd_c}`].r
                  ) {
                    const linetype =
                      borderInfoCompute[`${bd_r}_${bd_c}`].r.style;
                    const bcolor = borderInfoCompute[`${bd_r}_${bd_c}`].r.color;

                    if (_.isNil(br_obj.style[linetype])) {
                      br_obj.style[linetype] = 1;
                    } else {
                      br_obj.style[linetype] = br_obj.style[linetype] + 1;
                    }

                    if (_.isNil(br_obj.color[bcolor])) {
                      br_obj.color[bcolor] = 1;
                    } else {
                      br_obj.color[bcolor] = br_obj.color[bcolor] + 1;
                    }
                  }
                }
              }

              const rowlen = d[r][c].mc.rs;
              const collen = d[r][c].mc.cs;

              if (JSON.stringify(bl_obj).length > 23) {
                let bl_color = null;
                let bl_style = null;

                Object.keys(bl_obj.color).forEach((x) => {
                  if (bl_obj.color[x] >= rowlen / 2) {
                    bl_color = x;
                  }
                });

                Object.keys(bl_obj.style).forEach((x) => {
                  if (bl_obj.style[x] >= rowlen / 2) {
                    bl_style = x;
                  }
                });

                if (!_.isNil(bl_color) && !_.isNil(bl_style)) {
                  style += `border-left:${getHtmlBorderStyle(
                    bl_style,
                    bl_color
                  )}`;
                }
              }

              if (JSON.stringify(br_obj).length > 23) {
                let br_color = null;
                let br_style = null;

                Object.keys(br_obj.color).forEach((x) => {
                  if (br_obj.color[x] >= rowlen / 2) {
                    br_color = x;
                  }
                });

                Object.keys(br_obj.style).forEach((x) => {
                  if (br_obj.style[x] >= rowlen / 2) {
                    br_style = x;
                  }
                });

                if (!_.isNil(br_color) && !_.isNil(br_style)) {
                  style += `border-right:${getHtmlBorderStyle(
                    br_style,
                    br_color
                  )}`;
                }
              }

              if (JSON.stringify(bt_obj).length > 23) {
                let bt_color = null;
                let bt_style = null;

                Object.keys(bt_obj.color).forEach((x) => {
                  if (bt_obj.color[x] >= collen / 2) {
                    bt_color = x;
                  }
                });

                Object.keys(bt_obj.style).forEach((x) => {
                  if (bt_obj.style[x] >= collen / 2) {
                    bt_style = x;
                  }
                });

                if (!_.isNil(bt_color) && !_.isNil(bt_style)) {
                  style += `border-top:${getHtmlBorderStyle(
                    bt_style,
                    bt_color
                  )}`;
                }
              }

              if (JSON.stringify(bb_obj).length > 23) {
                let bb_color = null;
                let bb_style = null;

                Object.keys(bb_obj.color).forEach((x) => {
                  if (bb_obj.color[x] >= collen / 2) {
                    bb_color = x;
                  }
                });

                Object.keys(bb_obj.style).forEach((x) => {
                  if (bb_obj.style[x] >= collen / 2) {
                    bb_style = x;
                  }
                });

                if (!_.isNil(bb_color) && !_.isNil(bb_style)) {
                  style += `border-bottom:${getHtmlBorderStyle(
                    bb_style,
                    bb_color
                  )}`;
                }
              }
            }
          } else {
            continue;
          }
        } else {
          // 边框
          if (borderInfoCompute && borderInfoCompute[`${r}_${c}`]) {
            // 左边框
            if (borderInfoCompute[`${r}_${c}`].l) {
              const linetype = borderInfoCompute[`${r}_${c}`].l.style;
              const bcolor = borderInfoCompute[`${r}_${c}`].l.color;
              style += `border-left:${getHtmlBorderStyle(linetype, bcolor)}`;
            }

            // 右边框
            if (borderInfoCompute[`${r}_${c}`].r) {
              const linetype = borderInfoCompute[`${r}_${c}`].r.style;
              const bcolor = borderInfoCompute[`${r}_${c}`].r.color;
              style += `border-right:${getHtmlBorderStyle(linetype, bcolor)}`;
            }

            // 下边框
            if (borderInfoCompute[`${r}_${c}`].b) {
              const linetype = borderInfoCompute[`${r}_${c}`].b.style;
              const bcolor = borderInfoCompute[`${r}_${c}`].b.color;
              style += `border-bottom:${getHtmlBorderStyle(linetype, bcolor)}`;
            }

            // 上边框
            if (borderInfoCompute[`${r}_${c}`].t) {
              const linetype = borderInfoCompute[`${r}_${c}`].t.style;
              const bcolor = borderInfoCompute[`${r}_${c}`].t.color;
              style += `border-top:${getHtmlBorderStyle(linetype, bcolor)}`;
            }
          }
        }

        column = replaceHtml(column, { style, span });

        if (_.isNil(c_value)) {
          c_value = getCellValue(r, c, d);
        }
        // if (
        //   _.isNil(c_value) &&
        //   d[r][c] &&
        //   d[r][c].ct &&
        //   d[r][c].ct.t === "inlineStr"
        // ) {
        //   c_value = d[r][c].ct.s
        //     .map((val) => {
        //       const font = $("<font></font>");
        //       val.fs && font.css("font-size", val.fs);
        //       val.bl && font.css("font-weight", val.border);
        //       val.it && font.css("font-style", val.italic);
        //       val.cl === 1 && font.css("text-decoration", "underline");
        //       font.text(val.v);
        //       return font[0].outerHTML;
        //     })
        //     .join("");
        // }

        if (_.isNil(c_value)) {
          c_value = "";
        }

        column += c_value;
      } else {
        let style = "";

        // 边框
        if (borderInfoCompute && borderInfoCompute[`${r}_${c}`]) {
          // 左边框
          if (borderInfoCompute[`${r}_${c}`].l) {
            const linetype = borderInfoCompute[`${r}_${c}`].l.style;
            const bcolor = borderInfoCompute[`${r}_${c}`].l.color;
            style += `border-left:${getHtmlBorderStyle(linetype, bcolor)}`;
          }

          // 右边框
          if (borderInfoCompute[`${r}_${c}`].r) {
            const linetype = borderInfoCompute[`${r}_${c}`].r.style;
            const bcolor = borderInfoCompute[`${r}_${c}`].r.color;
            style += `border-right:${getHtmlBorderStyle(linetype, bcolor)}`;
          }

          // 下边框
          if (borderInfoCompute[`${r}_${c}`].b) {
            const linetype = borderInfoCompute[`${r}_${c}`].b.style;
            const bcolor = borderInfoCompute[`${r}_${c}`].b.color;
            style += `border-bottom:${getHtmlBorderStyle(linetype, bcolor)}`;
          }

          // 上边框
          if (borderInfoCompute[`${r}_${c}`].t) {
            const linetype = borderInfoCompute[`${r}_${c}`].t.style;
            const bcolor = borderInfoCompute[`${r}_${c}`].t.color;
            style += `border-top:${getHtmlBorderStyle(linetype, bcolor)}`;
          }
        }

        column += "";

        if (r === rowIndexArr[0]) {
          if (
            _.isNil(ctx.config) ||
            _.isNil(ctx.config.columnlen) ||
            _.isNil(ctx.config.columnlen[c.toString()])
          ) {
            colgroup += '<colgroup width="72px"></colgroup>';
          } else {
            colgroup += `<colgroup width="${
              ctx.config.columnlen[c.toString()]
            }px"></colgroup>`;
          }
        }

        if (c === colIndexArr[0]) {
          if (
            _.isNil(ctx.config) ||
            _.isNil(ctx.config.rowlen) ||
            _.isNil(ctx.config.rowlen[r.toString()])
          ) {
            style += "height:19px;";
          } else {
            style += `height:${ctx.config.rowlen[r.toString()]}px;`;
          }
        }

        column = replaceHtml(column, { style, span: "" });
        column += "";
      }

      column += "</td>";
      cpdata += column;
    }

    cpdata += "</tr>";
  }
  cpdata = `<table data-type="luckysheet_copy_action_table">${colgroup}${cpdata}</table>`;

  ctx.iscopyself = true;

  clipboard.writeHtml(cpdata);
}

export function deleteSelectedCellText(ctx: Context) {
  // if (
  //   !checkProtectionLockedRangeList(
  //     ctx.luckysheet_select_save,
  //     ctx.currentSheetIndex
  //   )
  // ) {
  //   return;
  // }

  // $("#luckysheet-rightclick-menu").hide();
  // luckysheetContainerFocus();

  if (ctx.allowEdit === false) {
    return;
  }

  const selection = ctx.luckysheet_select_save;
  if (selection && !_.isEmpty(selection)) {
    const d = getFlowdata(ctx);
    if (!d) return;

    let has_PartMC = false;

    for (let s = 0; s < selection.length; s += 1) {
      const r1 = selection[s].row[0];
      const r2 = selection[s].row[1];
      const c1 = selection[s].column[0];
      const c2 = selection[s].column[1];

      if (hasPartMC(ctx, ctx.config, r1, r2, c1, c2)) {
        has_PartMC = true;
        break;
      }
    }

    if (has_PartMC) {
      const locale_drag = locale().drag;

      if (isEditMode()) {
        alert(locale_drag.noPartMerge);
      } else {
        tooltip.info(locale_drag.noPartMerge, "");
      }

      return;
    }
    const hyperlinkMap =
      ctx.luckysheetfile[getSheetIndex(ctx, ctx.currentSheetIndex)].hyperlink;

    for (let s = 0; s < selection.length; s += 1) {
      const r1 = selection[s].row[0];
      const r2 = selection[s].row[1];
      const c1 = selection[s].column[0];
      const c2 = selection[s].column[1];

      for (let r = r1; r <= r2; r += 1) {
        for (let c = c1; c <= c2; c += 1) {
          // if (pivotTable.isPivotRange(r, c)) {
          //   continue;
          // }

          if (_.isPlainObject(d[r][c])) {
            const cell = d[r][c]!;
            delete cell.m;
            delete cell.v;

            if (cell.f != null) {
              delete cell.f;
              delFunctionGroup(ctx, r, c, ctx.currentSheetIndex);

              delete cell.spl;
            }

            if (cell.ct != null && cell.ct.t === "inlineStr") {
              delete cell.ct;
            }
          } else {
            d[r][c] = null;
          }
          // 同步清除 hyperlink
          if (hyperlinkMap && hyperlinkMap[`${r}_${c}`]) {
            delete hyperlinkMap[`${r}_${c}`];
          }
        }
      }
    }

    // jfrefreshgrid(d, ctx.luckysheet_select_save);

    // // 清空编辑框的内容
    // // 备注：在functionInputHanddler方法中会把该标签的内容拷贝到 #luckysheet-functionbox-cell
    // $("#luckysheet-rich-text-editor").html("");
  }
}