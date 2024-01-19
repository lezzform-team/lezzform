import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export function useOnMountUnsafe(effect: EffectCallback) {
  const initialized = useRef(false);
  const effectRef = useRef<EffectCallback>();

  useEffect(() => {
    if (!effect) return;

    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (effectRef.current) effectRef.current();
    }
  }, []);
}
