"use client";

import { useState } from "react";
import { Form } from "../../lezzform/_generated/s232";
import { MultiSelect } from "@lezzform/react";

export default function Page() {
  const [values, setValues] = useState<string[]>([]);

  console.log(values, "vls");

  return (
    <div>
      <Form
        onSubmit={(form, values) => {
          console.log(values, "values");
        }}
      />
      {/* <MultiSelect
        url="https://jsonplaceholder.typicode.com/comments"
        path={{ label: "name", value: "email" }}
        value={values}
        placeholder="ini placeholder"
        onChange={setValues}
      /> */}
    </div>
  );
}
