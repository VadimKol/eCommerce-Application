import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header.tsx';

export function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
