import styles from './styles.module.scss';

export function Footer({ appStyles }: { appStyles: string | undefined }): JSX.Element {
  return (
    <footer className={`${appStyles || ''} ${styles.footer}`}>
      <div className={styles.footerItem}>2024</div>
    </footer>
  );
}
