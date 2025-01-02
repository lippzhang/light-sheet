import React from "react";
import { useDialog } from "./useDialog";

export function useUIapi() {
  const { showDialog } = useDialog();
  return {
    showModal: (content: string | React.ReactNode, type?: "ok" | "yesno") => {
      showDialog(content, type);
    },
  };
}
