import styles from './styles.module.scss';

export function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerItem}>Geek Store © 2024</p>
      </div>
    </footer>
  );
}
