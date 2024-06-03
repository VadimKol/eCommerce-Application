export const calculateAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age >= 13;
};

export const sortingTypes = [
  'Alphabetically, A-Z',
  'Alphabetically, Z-A',
  'Price, low to high',
  'Price, high to low',
  /*   'Date, old to new',
  'Date, new to old', */
];

export const fandoms = [
  'Genshin',
  'Disney',
  'Cyberpunk',
  'Avengers',
  'Batman',
  'Doctor Who',
  'Star Wars',
  'Iron Man',
  'Beetlejuice',
  'Marvel',
  'One Piece',
  'Harry Potter',
  'Stranger Things',
  'Rick and Morty',
  'Supernatural',
  'Aladdin',
];

export const QUERY_LIMIT = 12;
export const PRICE_FILTER_MIN = 1;
export const PRICE_FILTER_MAX = 100;

export function getFandomsFilter(franchises: boolean[]): string {
  const filter: string[] = [];

  franchises.forEach((franchise, index) => {
    fandoms.forEach((fandom, i) => {
      if (index === i && franchise) {
        filter.push(`"${fandom}"`);
      }
    });
  });

  return filter.length > 0 ? `variants.attributes.Fandom:${filter.join(',')}` : '';
}

export class StatusError extends Error {
  public statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }
}
