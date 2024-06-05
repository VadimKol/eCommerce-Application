import styles from './styles.module.scss';
import type { TooltipProps } from './types.ts';

export function Tooltip({ text }: TooltipProps): JSX.Element {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
}

export default Tooltip;
