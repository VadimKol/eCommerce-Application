import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from '../../components/footer/Footer.tsx';
import { Header } from '../../components/header/Header.tsx';
import styles from './styles.module.scss';

export function App(): JSX.Element {
  return (
    <>
      <Header appStyles={styles.header} />
      <Outlet context={styles} />
      <Footer appStyles={styles.footer} />
      <ToastContainer />
    </>
  );
}
