import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface TextInfo {
  role?: string;
  contributions?: string;
  'Short bio'?: string;
  'Soft stack'?: string;
}

interface BlockInfoProps {
  title: string;
  classPhoto: string;
  link: string;
  textInfo: TextInfo;
  simpleText?: string[] | [];
  github?: string;
  isEvenBlock: boolean;
}

export function CommandBlock({
  title,
  classPhoto,
  link,
  textInfo,
  simpleText,
  github,
  isEvenBlock,
}: BlockInfoProps): JSX.Element {
  const softStackItems = textInfo['Soft stack']?.split(',').map((item) => item.trim()) || [];

  return (
    <div className={classNames(styles.blockInfo, { [styles.rotate as string]: isEvenBlock })}>
      <Link to={link} className={styles.linkImage}>
        <div className={classNames(styles.imageCommand, styles[classPhoto])} />
      </Link>
      <div className={styles.textInfo}>
        <Link to={link} className={styles.titleBlock}>
          <h2>{title} </h2>
        </Link>
        {github && (
          <div>
            <span className={styles.infoTitle}>Github: </span>
            <Link to={link} className={styles.link}>
              {github}
            </Link>
          </div>
        )}

        {textInfo.role && (
          <div>
            <span className={styles.infoTitle}>Role: </span>
            {textInfo.role}
          </div>
        )}
        {textInfo.contributions && (
          <div>
            <span className={styles.infoTitle}>Contributions: </span>
            {textInfo.contributions}
          </div>
        )}
        {textInfo['Short bio'] && (
          <div>
            <span className={styles.infoTitle}>Short bio: </span>
            {textInfo['Short bio']}
          </div>
        )}
        {textInfo['Soft stack'] && (
          <div>
            <span className={styles.infoTitle}>Soft stack: </span>
            {softStackItems.map((item) => (
              <span key={item} className={styles.softStackItem}>
                {item}
              </span>
            ))}
          </div>
        )}
        {simpleText && Array.isArray(simpleText) && simpleText.map((text) => <div key={text}>{text}</div>)}
      </div>
    </div>
  );
}

export default CommandBlock;
