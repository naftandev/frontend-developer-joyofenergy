import { calculation, renderDashboard } from './calculation.js';
import { renderChart } from './chart.js';
import { getReadings, groupByDay, sortByTime } from './reading';

const lastMonthBtn = document.getElementById('lastMonthBtn') as HTMLElement;
const lastDayBtn = document.getElementById('lastDayBtn') as HTMLElement;

const readings = await getReadings();
const lastMonthReadings = sortByTime(groupByDay(readings)).slice(-30);
renderChart(lastMonthReadings);
renderDashboard(calculation(lastMonthReadings));

lastMonthBtn.addEventListener('click', () => {
  renderChart(lastMonthReadings);
  renderDashboard(calculation(lastMonthReadings));
});
lastDayBtn.addEventListener('click', () => {
  const lastDayReadings = sortByTime(readings).slice(-24);
  renderChart(lastDayReadings, 'hours');
  renderDashboard(calculation(lastDayReadings));
});
