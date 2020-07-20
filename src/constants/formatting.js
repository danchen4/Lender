export const HEADER_FORMAT_1 = {
  fontSize: 1.4,
  fontWeight: 700,
  color: 'grey3',
  mTop: 0.5,
  mBot: 0.1,
};

export const HEADER_FORMAT_2 = {
  as: 'h3',
  fontSize: 1.6,
  fontWeight: 500,
  color: 'secondary',
  mTop: 0.5,
  mBot: 1,
};

export const CARD_FORMAT_1 = {
  width: 50,
  shadow: 'Xxs',
  padding: '1rem',
  colorGrade: 'light',
  bRadius: 8,
  bColor: 'grey1',
  bgColor: 'grey1',
};

export const CARD_FORMAT_2 = (incomeSource) => ({
  width: 50,
  shadow: 'Xxs',
  padding: '1rem 1rem 2rem 1rem',
  colorGrade: 'light',
  bRadius: 8,
  bColor: incomeSource.edit ? 'grey1' : 'none',
  bgColor: incomeSource.edit ? 'transparent' : 'grey1',
});
