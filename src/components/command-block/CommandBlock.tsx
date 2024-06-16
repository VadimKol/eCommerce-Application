import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface TextInfo {
  title?: string;
  github?: string;
  role?: string;
  contributions?: string;
  'Short bio'?: string;
  'Soft stack'?: string;
}

interface BlockInfoProps {
  classPhoto: string;
  link: string;
  textInfo: TextInfo;
  simpleText?: string;
  isEvenBlock: boolean;
}

export function CommandBlock({ classPhoto, link, textInfo, simpleText, isEvenBlock }: BlockInfoProps): JSX.Element {
  return (
    <div className={classNames(styles.blockInfo, { [styles.rotate as string]: isEvenBlock })}>
      <Link to={link} className={styles.linkImage}>
        <div className={classNames(styles.imageCommand, styles[classPhoto])} />
      </Link>
      <div className={styles.textInfo}>
        <h2>{textInfo.title} </h2>
        {textInfo.github && (
          <div>
            Github:{' '}
            <Link to={link} className={styles.link}>
              {textInfo.github}
            </Link>
          </div>
        )}

        {textInfo.role && <div>Role: {textInfo.role}</div>}
        {textInfo.contributions && <div>Contributions: {textInfo.contributions}</div>}
        {textInfo['Short bio'] && <div>Short bio: {textInfo['Short bio']}</div>}
        {textInfo['Soft stack'] && <div>Soft stack: {textInfo['Soft stack']}</div>}
        {simpleText && <div>{simpleText}</div>}
      </div>
    </div>
  );
}

export default CommandBlock;
