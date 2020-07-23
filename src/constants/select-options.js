export const PAY_FREQUENCY_SELECT = [
  { id: 'weekly', value: 'Weekly' },
  { id: 'biweekly', value: 'Bi-Weekly' },
  { id: 'semimonthly', value: 'Semi-Monthly' },
  { id: 'monthly', value: 'Monthly' },
];

export const OTHER_INCOME_SELECT = [
  { id: 'ss', value: 'Social Security' },
  { id: 'pension', value: 'Pension' },
  { id: 'disability', value: 'Disability' },
  { id: 'other', value: 'Other' },
];

export const WEEKLY_PAYDATE_SELECT = [
  { id: 'monday', value: 'Monday' },
  { id: 'tuesday', value: 'Tuesday' },
  { id: 'wednesday', value: 'Wednesday' },
  { id: 'thursday', value: 'Thursday' },
  { id: 'friday', value: 'Friday' },
];

export const MONTHLY_DATE_SELECT = [...Array(31).keys()].map((item) => ({
  id: item++,
  value: item++,
}));

export const SEMIMONTHLY_DATE1_SELECT = [...Array(15).keys()].map((item) => ({
  id: item++,
  value: item++,
}));

export const SEMIMONTHLY_DATE2_SELECT = [...Array(16).keys()].map((item) => ({
  id: item++ + 15,
  value: item++ + 15,
}));
