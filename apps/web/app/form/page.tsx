"use client";

import { Form } from "../../components/form";

export default function FormPage() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "100%" }}>
      <Form
        onSubmit={(values) => {
          console.log(values, "vls");
        }}
        defaultValues={{
          "SingleLineText 1": "bla",
          "SingleLineText 2": "cek 2",
          "TextArea 1": "celk 333",
        }}
      />
    </div>
  );
}
