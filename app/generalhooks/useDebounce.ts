import { useState, useEffect } from 'react';

/**
 * Retorna um valor com atraso (debounce)
 * @param value valor a ser controlado
 * @param delay tempo de atraso em milissegundos (default: 500ms)
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
