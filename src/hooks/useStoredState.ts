import { useCallback, useState } from "react";
import type { z } from "zod";
import { readStored, writeStored } from "../lib/storage";

/** useState that survives reloads. Stored data is validated with the schema on read. */
export function useStoredState<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStored(key, schema, fallback));

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        writeStored(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}
