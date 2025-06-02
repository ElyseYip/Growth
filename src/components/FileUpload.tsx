import { useCallback, memo, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useReducer";
import axios from "axios";
import { shallowEqual } from "react-redux";

const FilePreview = memo(({ preview }: { preview: string | null }) => (
  <img
    src={preview || undefined}
    alt="Preview"
    className="max-w-full max-h-[200px]"
  />
));

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const uploadedFile = useAppSelector(
    (state) => state.fileUpload,
    shallowEqual
  );
  console.log("uploadFile", uploadedFile);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
      const file = new FileReader();
      file.onload = () => {
        setPreview(file.result as string);
      };
      file.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProgress = useCallback((progress: number) => {
    setUploadProgress(Math.floor(progress)); // Round down to reduce updates
  }, []);

  const handleFileUpload = useCallback(async () => {
    if (!file) return;
    setStatus("uploading");
    setUploadProgress(0);

    try {
      // Read file as Base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]); // Extract Base64 part
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Prepare payload
      const payload = {
        base64Data: base64,
        fileName: file.name,
        fileType: file.type,
        // Add any additional metadata here
      };

      // Send to backend
      await axios.post("https://httpbin.org/post", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total) {
            updateProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
          }
          // const progress = ProgressEvent.total
          //   ? Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
          //   : 0;
          // setUploadProgress(progress);
        },
      });

      // Handle success
      dispatch({
        type: "fileUpload/appendFile",
        payload: payload,
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("fail");
      setUploadProgress(0);
    }
  }, [file, dispatch, updateProgress]);

  const handleDownload = useCallback(() => {
    if (!uploadedFile.file || uploadedFile.file.length === 0) return;

    uploadedFile.file.forEach((file) => {
      console.log("file", file);
      if (!file.base64Data || !file.fileType || !file.fileName) return;

      const link = document.createElement("a");
      link.href = `data:${file.fileType};base64,${file.base64Data}`;
      link.download = file.fileName;
      document.body.appendChild(link); // Needed for Firefox
      link.click();
      document.body.removeChild(link); // Cleanup
    });
  }, [uploadedFile]);

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("file dropped", e.dataTransfer.files[0]);
    if (e.dataTransfer.files) {
      setStatus("initial");
      setFile(e.dataTransfer.files[0]);
      const file = new FileReader();
      file.onload = () => {
        setPreview(file.result as string);
      };
      file.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="border-solid border-2 border-black rounded-lg w-64 h-32 flex justify-center items-center"
        onDrop={onDropHandler}
        onDragOver={onDragOverHandler}
      >
        <input
          type="file"
          id="file"
          className="w-60"
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <section>
          <div>File Details</div>
          <p>File Name: {file.name}</p>
          <p>File Size: {(file.size / 1024).toFixed(2)} kb</p>
        </section>
      )}
      {file && status !== "uploading" && (
        <button
          onClick={handleFileUpload}
          className="bg-blue-300 p-1 rounded-lg"
        >
          Upload File
        </button>
      )}
      {status === "uploading" && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>{uploadProgress} % uploaded</p>
        </div>
      )}
      {status === "success" && <p>File uploaded successfully!</p>}
      {status === "fail" && <p>Upload failed. Please try again</p>}
      {file && (
        <FilePreview preview={preview} />
        // <img
        //   src={preview || undefined}
        //   // src={file ? URL.createObjectURL(file) : ""}
        //   // alt="Preview"
        //   // style={{ maxWidth: "100%", maxHeight: "200px" }}
        // />
      )}

      {uploadedFile?.file.length > 0 && (
        <div className="bg-green-200 text-white p-4 rounded-lg">
          <button onClick={handleDownload}>Download File</button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
