import classNames from 'classnames';

import { CommandBlock } from '@/components/command-block/CommandBlock.tsx';

import { commandInfo, teamText } from './data.ts';
import styles from './styles.module.scss';

export function About(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className="visually-hidden">About page</h1>
        <div className={styles.blocksInfo}>
          <div className={styles.blockIntro}>
            <h2 className={styles.introTitle}>Team work</h2>

            {teamText &&
              teamText.map((texts) => (
                <div className={styles.introParagraph} key={texts.key}>
                  {texts.text}
                </div>
              ))}
          </div>
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
