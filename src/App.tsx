import { useState } from "react";
import "./App.css";

function App() {

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setProgress(0); // reset progress
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Request a presigned PUT URL from your backend
      const response = await fetch("http://localhost:5000/api/v1/storage/files/presign-put", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name }),
      });

      if (!response.ok) {
        alert("Failed to get presigned URL");
        return;
      }

      const { url } = await response.json();

      // // Step 2: Upload the file to MinIO via the presigned URL
      // const uploadRes = await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": file.type || "application/octet-stream",
      //   },
      //   body: file,
      // });

      // if (uploadRes.ok) {
      //   alert("File uploaded successfully!");
      // } else {
      //   alert("Upload failed");
      // }

      // Step 2: Use XMLHttpRequest to upload with progress
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setProgress(percent);
        }
      };

      // Handle upload complete
      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          alert("File uploaded successfully!");
        } else {
          alert("Upload failed.");
        }
      };

      // Handle errors
      xhr.onerror = () => {
        setUploading(false);
        alert("Network error during upload.");
      };

      // Send the file
      xhr.send(file);
    } catch (err) {
      setUploading(false);
      alert("Failed to upload file.");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <p>{progress.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
