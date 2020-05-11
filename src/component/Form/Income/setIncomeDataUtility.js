export default (values) => {
  const employerDataCopy = {
    employerName: { label: 'Employer Name', value: values.employerName },
    address1: { label: 'Employer Address 1', value: values.address1 },
    address2: { label: 'Employer Address 2', value: values.address2 },
    city: { label: 'Employer City', value: values.city },
    state: { label: 'Employer State', value: values.state },
    zip: { label: 'Employer ZIP Code', value: values.zip },
    phone: { label: 'Employer Phone Number', value: values.phone },
  };

  const incomeDataCopy = {
    grossIncome: { label: 'Gross Income', value: values.grossIncome },
    payFrequency: { label: 'Pay Frequency', value: values.payFrequency },
    nextPayDate: { label: 'Next Pay Date', value: values.nextPayDate },
    weeklyPayDate: { label: 'Weekly Pay Date', value: values.weeklyPayDate },
    monthlyPayDate: { label: 'Monthly Pay Date', value: values.monthlyPayDate },
    semiMonthlyDate1: { label: 'Semi-Monthly Pay Date 1', value: values.semiMonthlyDate1 },
    semiMonthlyDate2: { label: 'Semi-Monthly Pay Date 2', value: values.semiMonthlyDate2 },
  };

  return {
    edit: false,
    source: { label: 'Income Source', value: values.incomeSource },
    otherIncomeName: { label: 'Other Income Name', value: values.otherIncomeName },
    employerData: employerDataCopy,
    incomeData: incomeDataCopy,
  };
};
