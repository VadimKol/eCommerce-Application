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
  'Date, old to new',
  'Date, new to old',
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
