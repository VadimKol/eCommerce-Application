import classNames from 'classnames';

import { CommandBlock } from '@/components/command-block/CommandBlock.tsx';

import styles from './styles.module.scss';

const commandInfo = [
  {
    title: 'Ivan Zhirebny',
    classPhoto: 'imageIzy',
    link: 'https://github.com/izy-code',
    textInfo: {
      role: 'frontend-developer',
      contributions: 'CommerceTools, Tests, Routing, Detail page, Header, Breadcrumbs, React contexts, 404 page',
      'Short bio':
        ' Graduated from the Bauman Moscow State Technical University, completed the Frontend Developer program at the HTML Academy',
      'Soft stack': 'CSS, Sass, HTML, JavaScript, Java, TypeScript, Webpack, Vite, Jest, React',
    },
    github: 'izy-code',
    simpleText: [],
  },
  {
    title: 'Vadim Kolymbet',
    classPhoto: 'imageVadim',
    link: 'https://github.com/VadimKol',
    textInfo: {
      role: 'frontend-developer',
      contributions: 'CommerceTools, Tests, Login page, Catalog page, Cart page',
      'Short bio':
        'Graduated from Saratov State University, studied at the Faculty of Computer Science and Information Technologies and in the Department of Computer Security and Cryptography Theory.',
      'Soft stack': 'CSS, Sass, SQL, HTML, JavaScript, TypeScript, Webpack, Vite, Jest, React',
    },
    github: 'vadimkol',
    simpleText: [],
  },
  {
    title: 'Aleksandra Bodnar',
    classPhoto: 'imageAlex',
    link: 'https://github.com/BodnarAlex',
    textInfo: {
      role: ' frontend-developer, scrum-master',
      contributions: 'CommerceTools, Design, Registration page, Home page, About page, Profile page',
      'Short bio':
        'Graduated from the Immanuel Kant Baltic Federal University, studied at the Faculty of Business Informatics. Graduated from 3WC courses with a degree in Frontend-developer. Worked on PHP for 1C CRM.',
      'Soft stack': 'PHP, C++, Python, Wordpress, CSS, Sass, HTML, JavaScript, TypeScript, Webpack, Vite, React',
    },
    github: 'bodnaralex',
    simpleText: [],
  },
  {
    title: 'Rolling Scopes School',
    classPhoto: 'imageRss',
    link: 'https://rollingscopes.com/',
    textInfo: {},
    simpleText: [
      'RSSchool is an online educational community specializing in web development and programming. It offers comprehensive, well-structured courses designed for both beginners and experienced developers. Known for its high-quality education, RSSchool provides an extensive curriculum that covers everything from basic HTML, CSS, and JavaScript to advanced technologies like React and Node.js. The school is emphasis on project-based learning allows students to build real-world projects and create impressive portfolios.',
      'RSSchool thrives on a vibrant community of volunteers, including seasoned developers and alumni who mentor and support new learners.',
    ],
    github: '',
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
              title={info.title}
              classPhoto={info.classPhoto}
              link={info.link}
              textInfo={info.textInfo}
              simpleText={info.simpleText}
              github={info.github}
              isEvenBlock={(index + 1) % 2 === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
