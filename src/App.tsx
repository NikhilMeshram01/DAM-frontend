import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { store } from './store';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import AssetDetails from './pages/AssetDetails';
import AdminDashboard from './pages/AdminDashboard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="upload" element={<Upload />} />
                <Route path="asset/:id" element={<AssetDetails />} />

                {/* Admin Only Routes */}
                <Route path="admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
            },
          }}
        />

        {/* React Query DevTools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [files, setFiles] = useState<File[]>([]);
//   const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
//   const [uploading, setUploading] = useState<boolean>(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
//     setFiles(selectedFiles);
//     setProgressMap({});
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (files.length === 0) {
//       alert("Please select at least one file.");
//       return;
//     }

//     setUploading(true);

//     for (const file of files) {
//       try {
//         // Step 1: Get presigned URL
//         const res = await fetch("http://localhost:5000/api/v1/storage/presign", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: file.name }),
//         });

//         if (!res.ok) {
//           alert(`Failed to get presigned URL for ${file.name}`);
//           continue;
//         }

//         const { url, key } = await res.json();

//         // Step 2: Upload via XHR
//         await new Promise<void>((resolve, reject) => {
//           const xhr = new XMLHttpRequest();
//           xhr.open("PUT", url, true);
//           xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

//           xhr.upload.onprogress = (event) => {
//             if (event.lengthComputable) {
//               const percent = (event.loaded / event.total) * 100;
//               setProgressMap(prev => ({ ...prev, [file.name]: percent }));
//             }
//           };

//           xhr.onload = async () => {
//             if (xhr.status === 200) {
//               // Step 3: Confirm with backend
//               try {
//                 const confirmRes = await fetch("http://localhost:5000/api/v1/storage/confirm", {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({
//                     key,
//                     fileName: file.name,
//                     originalName: file.name,
//                     mimeType: file.type,
//                     size: file.size,
//                     tags: [],
//                     category: "image", // or other
//                   }),
//                 });

//                 if (!confirmRes.ok) {
//                   alert(`Failed to confirm upload for ${file.name}`);
//                 } else {
//                   console.log(`Confirmed upload for ${file.name}`);
//                 }
//               } catch (err) {
//                 console.error(`Error confirming ${file.name}`, err);
//               }

//               resolve();
//             } else {
//               reject(new Error(`Upload failed for ${file.name}`));
//             }
//           };

//           xhr.onerror = () => reject(new Error(`Network error during upload of ${file.name}`));

//           xhr.send(file);
//         });

//       } catch (err) {
//         console.error(`Error uploading ${file.name}:`, err);
//       }
//     }

//     setUploading(false);
//     alert("Upload process completed.");
//   };

//   return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" multiple onChange={handleFileChange} />
//         <br />
//         <button type="submit" disabled={uploading}>
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </form>

//       {files.length > 0 && (
//         <div style={{ marginTop: "20px" }}>
//           {files.map(file => (
//             <div key={file.name} style={{ marginBottom: "10px" }}>
//               <strong>{file.name}</strong>
//               <progress value={progressMap[file.name] || 0} max="100" style={{ width: "100%" }} />
//               <p>{(progressMap[file.name] || 0).toFixed(1)}%</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
