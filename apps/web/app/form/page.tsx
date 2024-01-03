"use client";

import { useState } from "react";

export default function FormPage() {
  const [date, setDate] = useState<Date>();
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "5rem",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "64rem",
          marginInline: "auto",
          backgroundColor: "white",
          borderRadius: "0.625rem",
          padding: "2rem",
        }}
      >
        {/* <Attachment
          acceptedFormats={["image/jpeg", "image/png"]}
          maxSize={2048}
          headers={{
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTk2ZjA5ZC1jZWE1LTQxMGYtOTU5OS1kNjMyYTU5ODU1NWMiLCJlbWFpbCI6ImlsaGFtYWRpcHV0cmExOUBnbWFpbC5jb20iLCJyb2xlcyI6W3siaWQiOiJBRE1JTiIsIm5hbWUiOiJBRE1JTiJ9XSwiaWF0IjoxNzAzMjEwNTQ0LCJleHAiOjE3MDM4MTUzNDR9.Ykjmhotb9v3Mc15TpORp9yaVaVQZexRhuH7zpsehNSU",
          }}
          value={value}
          label="Upload"
          onChange={setValue}
          onError={setError}
          error={error}
          path={{ value: "url", body: "file" }}
          url="https://app-v3.dumbways.id/api/v1/upload"
        /> */}
      </div>
    </div>
  );
}
