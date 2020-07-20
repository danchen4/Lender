import React from 'react';
import PropTypes from 'prop-types';
import { Spacer, ScFlexBox, ScHeader, ScTextBox, ScFlexItem } from '../../../UI/Styled';
import { HEADER_FORMAT_1, HEADER_FORMAT_2 } from '../../../../constants';
import { formatCurrency } from '../../../../helper';

export const IncomeSource = ({ incomeSource, index }) => {
  return (
    <Spacer mTop={0.5} mBot={0.5}>
      <ScHeader {...HEADER_FORMAT_2}>Income Source {index + 1}</ScHeader>
      <ScFlexBox justify="flex-start">
        <ScFlexItem basis="50%">
          <ScHeader as="h4" {...HEADER_FORMAT_1}>
            Income Source {index + 1}
          </ScHeader>
          <ScTextBox padding="0.3rem">
            {(incomeSource.employerData.employerName.value && 'Employment') ||
              (incomeSource.otherIncomeName.value && 'Retirement/Pension')}
          </ScTextBox>
        </ScFlexItem>
        <ScFlexItem basis="50%">
          <ScHeader as="h4" {...HEADER_FORMAT_1}>
            Income Name
          </ScHeader>
          <ScTextBox padding="0.3rem">
            {incomeSource.employerData.employerName.value || incomeSource.otherIncomeName.value}
          </ScTextBox>
        </ScFlexItem>
        <ScFlexItem basis="50%">
          <ScHeader as="h4" {...HEADER_FORMAT_1}>
            Gross Income
          </ScHeader>
          <ScTextBox padding="0.3rem">
            {formatCurrency(incomeSource.incomeData.grossIncome.value)}
          </ScTextBox>
        </ScFlexItem>
        <ScFlexItem basis="50%">
          <ScHeader as="h4" {...HEADER_FORMAT_1}>
            Pay Frequency
          </ScHeader>
          <ScTextBox padding="0.3rem">{incomeSource.incomeData.payFrequency.value}</ScTextBox>
        </ScFlexItem>
      </ScFlexBox>
    </Spacer>
  );
};

IncomeSource.propTypes = {
  incomeSource: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
