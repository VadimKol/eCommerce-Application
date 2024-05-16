import { useOutletContext } from 'react-router-dom';

export function useAppStyles(): CSSModuleClasses {
  return useOutletContext<CSSModuleClasses>();
}
