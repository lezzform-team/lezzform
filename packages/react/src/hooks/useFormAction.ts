import { LezzformAction } from "@lezzform/types";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";

export const useFormAction = <Dto = Record<string, unknown>>(
  props?: LezzformAction,
) => {
  const propsPref = useRef<LezzformAction>();

  useEffect(() => {
    if (!props) return;

    propsPref.current = props;
  }, [props]);

  const execute = useCallback(async (values: Dto) => {
    const action = propsPref.current;
    if (!action) return;

    if (action.type !== "api") return;

    const headers = action.headers.reduce((acc, curr) => {
      return { ...acc, [curr.key]: curr.value };
    }, {});

    if (action.method === "post") {
      const response = await axios.post(action.url, values, { headers });
      return response;
    }
    if (action.method === "patch") {
      const response = await axios.patch(action.url, values, { headers });
      return response;
    }
    if (action.method === "put") {
      const response = await axios.put(action.url, values, { headers });
      return response;
    }
  }, []);

  return { execute };
};
