import { useNavigate } from 'react-router-dom';

export function NoMatch(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>Sorry, page not found.</p>
      <button type="button" onClick={() => navigate(-1)}>
        Previous page
      </button>
      <button type="button" onClick={() => navigate('/')}>
        Home page
      </button>
    </div>
  );
}
