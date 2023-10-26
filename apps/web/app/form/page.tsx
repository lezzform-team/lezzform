"use client";

import { Form } from "../../lezzform/_generated/form";

export default function FormPage() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "100%" }}>
      <Form
        onSubmit={(values) => {
          console.log(values, "vls");
        }}
      />
    </div>
  );
}
