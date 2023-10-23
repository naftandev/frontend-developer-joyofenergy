import { TCalculationValues, TReadingValues } from './interfaces';

const KWH_COST_EC = 0.092; // USD
const KW_CO2_FACTOR_EC = 0.000092; // TONS

export const calculateConsumption = (readings: TReadingValues[]): number => {
  if (!readings?.length) return 0;
  return Number(
    readings
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      )
      .toFixed(4)
  );
};

export const calculateCost = (consumption: number): number => {
  if (!consumption) return 0;
  return Number((consumption * KWH_COST_EC).toFixed(2));
};

export const calculateCarbonFeetprint = (consumption: number): number => {
  if (!consumption) return 0;
  return Number((consumption * KW_CO2_FACTOR_EC).toFixed(6));
};

export const calculation = (readings: TReadingValues[]): TCalculationValues => {
  const consumption = calculateConsumption(readings);
  const cost = calculateCost(consumption);
  const carbonFeetprint = calculateCarbonFeetprint(consumption);
  return { consumption, cost, carbonFeetprint };
};

export const renderDashboard = (data: TCalculationValues): void => {
  const dashboardNode = document.getElementById('dashboard') as HTMLElement;
  const getCardTemplate = ({ value, title, units }) => {
    const template = `
      <div class='dashboardCardWidth center shadow-2 roundedMore bg-super-light-grey overflow-hidden'>
        <strong class='block h2 pt1 pr1 pl1 pb1 greyBlue'>${value}</strong>
        <div class='center pt1 pr1 pl1 pb1 bg-very-light-grey'>
          <p class='h5 darkgray bold'>${title}</p>
          <span class='darkgray'>${units}</span>
        </div>
      </div>
    `;
    const HTML = document.implementation.createHTMLDocument();
    HTML.body.innerHTML = template;
    return HTML.body.children[0];
  };

  dashboardNode.innerHTML = '';
  dashboardNode.appendChild(
    getCardTemplate({
      value: data.consumption,
      title: 'Consumption',
      units: 'kW',
    })
  );
  dashboardNode.appendChild(
    getCardTemplate({ value: data.cost, title: 'Cost', units: 'USD' })
  );
  dashboardNode.appendChild(
    getCardTemplate({
      value: data.carbonFeetprint,
      title: 'Carbon Feetprint',
      units: 'Ton CO2',
    })
  );
};
