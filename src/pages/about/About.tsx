import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function About(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className="visually-hidden">About page</h1>

        <div>
          <div className={styles.blocksInfo}>
            <div className={styles.blockInfo}>
              <Link to="https://github.com/izy-code" className={styles.linkImage}>
                <div className={classNames(styles.imageCommand, styles.imageIzy)} />
              </Link>
              <div className={styles.textInfo}>
                <h2>Ivan Zhirebny</h2>
                <div>
                  {' '}
                  Github:{' '}
                  <Link to="https://github.com/BodnarAlex" className={styles.link}>
                    izy-code
                  </Link>
                </div>
                <div>Role: web-developer</div>
                <div>Contributions: </div>
                <div>
                  Short bio: I graduated from the Bauman Moscow State Technical University, completed the Frontend
                  Developer program at the HTML Academy.
                </div>
                <div>Soft stack: CSS, Sass, HTML, JS, Java, TS, Webpack, Vite, Jest, React</div>
              </div>
            </div>
            <div className={classNames(styles.blockInfo, styles.rotate)}>
              <Link to="https://github.com/VadimKol" className={styles.linkImage}>
                <div className={classNames(styles.imageCommand, styles.imageVadim)} />
              </Link>
              <div className={styles.textInfo}>
                <h2>Vadim Kolymbet</h2>
                <div>
                  Github:{' '}
                  <Link to="https://github.com/BodnarAlex" className={styles.link}>
                    vadimkol
                  </Link>
                </div>
                <div>Role: web-developer</div>
                <div>Contributions: </div>

                <div>
                  Short bio: I graduated from Saratov State University at two thousand thirteen. I studied in the
                  Faculty of Computer Science and Information Technologies and in the Department of Computer Security
                  and Cryptography Theory.
                </div>
                <div>
                  Soft stack: C/C++, PowerScript, BASH, CSS, Sass, SQL, HTML, JS, TS, Webpack, Vite, Jest, React
                </div>
              </div>
            </div>
            <div className={styles.blockInfo}>
              <Link to="https://github.com/BodnarAlex" className={styles.linkImage}>
                <div className={classNames(styles.imageCommand, styles.imageAlex)} />
              </Link>
              <div className={styles.textInfo}>
                <h2>Aleksandra Bodnar </h2>

                <div>
                  Github:{' '}
                  <Link to="https://github.com/BodnarAlex" className={styles.link}>
                    bodnaralex
                  </Link>
                </div>
                <div>Role: web-developer, scrum-master</div>
                <div>Contributions: design</div>
                <div>
                  Short bio: I chose the specialty Business Informatics. I think it sounds weirder in English. But
                  incredible experience, and in the end the best and widest choice of professions. We were well trained
                  in the basics of business and marketing, business processes and SRM, and most importantly programming.
                  This is html, css, js, writing websites and connecting them to WordPress, also Python, C++ and SQL.
                </div>
                <div>
                  Soft stack: WordPress, Python, C++, SQL, CSS, Sass, HTML, JS, TS, Webpack, Vite, Jest, React, PHP
                </div>
              </div>
            </div>
            <div className={classNames(styles.blockInfo, styles.rotate)}>
              <Link to="https://rollingscopes.com/" className={styles.linkImage}>
                <div className={classNames(styles.imageCommand, styles.imageRss)} />
              </Link>
              <div className={styles.textInfo}>
                <div>
                  RSSchool (Rolling Scopes School) is an online school and community that focuses on teaching web
                  development and programming skills. It is particularly known for its comprehensive and well-structured
                  courses that cater to beginners as well as more experienced developers. Here are some key features and
                  aspects of RSSchool
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
