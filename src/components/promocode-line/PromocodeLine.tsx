import classNames from 'classnames';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';

interface BlockInfoProps {
  colorClass: string;
  text: string;
  copyText: string;
}
export function PromocodeLine({ colorClass, text, copyText }: BlockInfoProps): JSX.Element {
  async function handleCopyClick(): Promise<void> {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success(`You copied Promo Code '${copyText}'`);
    } catch {
      toast.error(`Failed to copy Promo Code`);
    }
  }
  return (
    <div
      className={classNames(styles.animateBlock, styles[colorClass])}
      onClick={() => {
        handleCopyClick().catch(() => {});
      }}
    >
      <div className={styles.animateLine}>{text} </div>
    </div>
  );
}

export default PromocodeLine;
