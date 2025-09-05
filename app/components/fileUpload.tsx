"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (res: any) => void;
  onProgress?: (res: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, fileType, onProgress }: FileUploadProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
      if (file.size >= 100 * 1024 * 1024) {
        setError("File must be less then 100MB");
      }
    }
    return true;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !validateFile(file)) return;
    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      // console.log("✅", auth);
      const uploadResponse = await upload({
        file: file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        signature: auth.authenticationParameters.signature,

        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      onSuccess(uploadResponse);
      console.log("Upload successful ✅", uploadResponse);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Uploading...</span>}
    </>
  );
};

export default FileUpload;
