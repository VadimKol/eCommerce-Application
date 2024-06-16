import classNames from 'classnames';

import { CommandBlock } from '@/components/command-block/CommandBlock.tsx';

import styles from './styles.module.scss';

const commandInfo = [
  {
    classPhoto: 'imageIzy',
    title: 'Ivan Zhirebny',
    link: 'https://github.com/izy-code',
    textInfo: {
      title: 'Ivan Zhirebny',
      github: 'izy-code',
      role: 'web-developer',
      contributions: 'Routing, Detail page, Header',
      'Short bio':
        ' I graduated from the Bauman Moscow State Technical University, completed the Frontend Developer program at the HTML Academy',
      'Soft stack': 'CSS, Sass, HTML, JS, Java, TS, Webpack, Vite, Jest, React',
    },
    simpleText: '',
  },
  {
    classPhoto: 'imageVadim',
    link: 'https://github.com/VadimKol',
    textInfo: {
      title: 'Vadim Kolymbet',
      github: 'vadimkol',
      role: 'web-developer',
      contributions: 'E-commerce, Login, Catalog',
      'Short bio':
        'I graduated from Saratov State University at two thousand thirteen. I studied in the Faculty of Computer Science and Information Technologies and in the Department of Computer Security and Cryptography Theory.',
      'Soft stack': 'C/C++, PowerScript, BASH, CSS, Sass, SQL, HTML, JS, TS, Webpack, Vite, Jest, React',
    },
    simpleText: '',
  },
  {
    classPhoto: 'imageAlex',
    link: 'https://github.com/BodnarAlex',
    textInfo: {
      title: 'Aleksandra Bodnar',
      github: 'bodnaralex',
      role: ' web-developer, scrum-master',
      contributions: 'Routing',
      'Short bio':
        'I chose the specialty Business Informatics. I think it sounds weirder in English. But        incredible experience, and in the end the best and widest choice of professions. We were well trained        in the basics of business and marketing, business processes and SRM, and most importantly programming.        This is html, css, js, writing websites and connecting them to WordPress, also Python, C++ and SQL.',
      'Soft stack': 'CSS, Sass, HTML, JS, Java, TS, Webpack, Vite, Jest, React',
    },
    simpleText: '',
  },
  {
    classPhoto: 'imageRss',
    link: 'https://rollingscopes.com/',
    textInfo: {},
    simpleText:
      'RSSchool (Rolling Scopes School) is an online school and community that focuses on teaching web development and programming skills. It is particularly known for its comprehensive and well-structured courses that cater to beginners as well as more experienced developers. Here are some key features and aspects of RSSchool',
  },
];

export function About(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className="visually-hidden">About page</h1>
        <div className={styles.blocksInfo}>
          {commandInfo.map((info, index) => (
            <CommandBlock
              key={info.classPhoto}
              classPhoto={info.classPhoto}
              link={info.link}
              textInfo={info.textInfo}
              simpleText={info.simpleText}
              isEvenBlock={(index + 1) % 2 === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
