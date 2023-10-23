import * as chartJs from 'chart.js';
import { TReadingValues } from './interfaces';

let chart: any;

export const formatDateLabel = (timestamp: number, type?: string): string => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  const time = date.toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatPart = (value: number): string =>
    value < 10 ? `0${value}` : `${value}`;

  if (type === 'hours') {
    return time;
  } else {
    return `${formatPart(day)}/${formatPart(month + 1)}`;
  }
};

export const renderChart = (
  readings: TReadingValues[],
  type?: string
): void => {
  chartJs.Chart.defaults.font.size = 10;

  chartJs.Chart.register.apply(
    null,
    Object.values(chartJs).filter((chartClass: any) => chartClass.id)
  );

  const labels = readings.map(({ time }) => formatDateLabel(time, type));
  const values = readings.map(({ value }) => value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'kWh usage',
        data: values,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: '#5A8EDA',
        borderRadius: 10,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }

  chart = new chartJs.Chart('usageChart', {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    },
  });
};
