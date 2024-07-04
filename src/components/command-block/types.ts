interface TextInfo {
  role?: string;
  contributions?: string;
  'Short bio'?: string;
  'Soft stack'?: string;
}

export interface BlockInfoProps {
  title: string;
  classPhoto: string;
  link: string;
  textInfo: TextInfo;
  simpleText?: string[] | [];
  github?: string;
  isEvenBlock: boolean;
}

export interface BlockParagraph {
  title: string;
  content: string;
}
