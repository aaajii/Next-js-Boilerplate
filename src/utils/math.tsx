import cn from 'classnames';
import moment from 'moment';

export const round = (price: number) => {
  return Math.round((price + Number.EPSILON) * 100) / 100;
};

export const getPercentageChange = (oldNumber: number, newNumber: number) => {
  const decreaseValue = oldNumber - newNumber;

  return newNumber === 0 ? 0 : (decreaseValue / newNumber) * 100;
};

export const formatPercentNumber = (percent: number) => {
  let formattedNumber = percent.toString();
  const isPositive = percent > 0;
  const isNegative = percent < 0;

  if (isPositive) {
    formattedNumber = `+${percent}`;
  }

  return (
    <span
      className={cn({
        'text-green-500': isPositive,
        'text-red-500': isNegative,
      })}
    >
      {formattedNumber}%
    </span>
  );
};

export const getCurrentTime = () => {
  const tzOffset = moment().utcOffset() * 60;
  const nowOffset = moment().unix() + tzOffset;

  const chartStartTime = tzOffset - 86400;
  const chartEndTime = nowOffset;

  return {
    chartStartTime,
    chartEndTime,
  };
};

export const getSymbol = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('symbol');
};
