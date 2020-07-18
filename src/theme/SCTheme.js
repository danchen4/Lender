import { MATERIAL_UI_THEME } from './MUITheme';

const customMediaQuery = (maxWidth) => `(max-width: ${maxWidth})`;

const media = {
  custom: customMediaQuery,
  phone: customMediaQuery('37.5em'),
  tabPort: customMediaQuery('56.25em'),
  tabLand: customMediaQuery('75em'),
};

export const SCTheme = {
  ...MATERIAL_UI_THEME,
  bp: {
    custom: media.custom,
    phone: media.phone,
    tabPort: media.tabPort,
    tabLand: media.tabLand,
  },
  color: {
    grey: {
      light1: '#f7f7f7',
      light2: '#eeeeee',
      light3: '#cccccc',
      dark1: '#777',
      dark2: '#999',
      dark3: '#333',
    },
  },
  shadow: {
    Xxs: '0 0.3rem 0.8rem rgba(0,0,0, 0.05)',
    Xs: '0 0.5rem 2rem rgba(0,0,0, 0.08)',
    Sm: '0 0.8rem 2.5rem rgba(0,0,0, 0.1)',
    Md: '0 1.5rem 4rem rgba(0,0,0, 0.15)',
    Lg: '0 2rem 5rem rgba(0,0,0, 0.2)',
    SmoothXs: `0 0.1rem 0.1rem rgba(0,0,0,0.2), 0 0.2rem 0.2rem rgba(0,0,0,0.16),
  0 0.4rem 0.4rem rgba(0,0,0,0.12), 0 0.8rem 0.8rem rgba(0,0,0,0.08)`,
    SmoothSm: `0 0.1rem 0.1rem rgba(0,0,0,0.2), 0 0.2rem 0.2rem rgba(0,0,0,0.16),
  0 0.4rem 0.4rem rgba(0,0,0,0.12), 0 0.8rem 0.8rem rgba(0,0,0,0.08),
  0 1.6rem 1.6rem rgba(0,0,0,0.04)`,
    SmoothMd: `0 0.1rem 0.1rem rgba(0,0,0,0.07),
  0 0.2rem 0.4rem rgba(0,0,0,0.07), 0 0.4rem 0.8rem rgba(0,0,0,0.07),
  0 0.8rem 1.6rem rgba(0,0,0,0.07), 0 1.6rem 3.2em rgba(0,0,0,0.07)`,
  },
};
