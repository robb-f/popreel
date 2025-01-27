"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ClerkLogo } from "../components/clerk-logo";
import { NextLogo } from "../components/next-logo";
import Link from "next/link";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      // Step 1: Request a pre-signed URL from the API
      const response = await fetch("/api/upload-url.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL.");
      }

      const { uploadUrl, fileKey } = await response.json();

      // Step 2: Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (uploadResponse.ok) {
        setMessage(`File uploaded successfully! File key: ${fileKey}`);
      } else {
        throw new Error("Failed to upload file to S3.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <div>
          <header className="flex items-center justify-between w-full h-16 gap-4">
            <div className="flex gap-4">
              <ClerkLogo />
              <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
              <NextLogo />
              <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
              >
                Dashboard
              </Link>
              <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
              <Link
                href="/for-you"
                className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
              >
                For You
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    organizationPreviewAvatarBox: "size-6",
                  },
                }}
              />
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "size-6",
                  },
                }}
              />
            </div>
          </header>
          <h1 className="text-xl font-bold mt-4">Upload Your Video</h1>
          <div className="mt-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            >
              Upload
            </button>
            {uploadProgress > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Upload Progress: {uploadProgress}%
              </p>
            )}
            {message && (
              <p className="mt-4 text-sm text-green-600">{message}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
