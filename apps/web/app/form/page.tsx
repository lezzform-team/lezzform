"use client";

import { Form } from "../../lezzform/_generated/form-1";

export default function FormPage() {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "5rem",
        height: "100vh",
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
        <Form
          onSubmit={(values) => {
            console.log(values, "values");
          }}
        />
      </div>
    </div>
  );
}
