import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header.tsx';
import { Footer } from './components/footer/Footer.tsx';

export function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
