import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../reducer/store";

export interface File {
  base64Data: string;
  fileName: string;
  fileType: string;
}
export interface FileUploadState {
  file: File[];
}

const initialState: FileUploadState = {
  file: [],
};

export const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    appendFile: (state, action: PayloadAction<File>) => {
      state.file = [...state.file, action.payload];
    },
  },
});

export const { appendFile } = fileUploadSlice.actions;
export const selectFile = (state: RootState) => state.fileUpload.file;
export default fileUploadSlice.reducer;
