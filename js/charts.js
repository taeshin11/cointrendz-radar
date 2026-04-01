/**
 * CoinTrendz Radar - Charts Module
 * Fear & Greed gauge and sparkline charts using Chart.js
 */

const Charts = (() => {
  let gaugeChart = null;
  const sparklineCharts = {};

  function getGaugeColor(value) {
    if (value <= 25) return '#EF4444';       // Extreme Fear - Red
    if (value <= 45) return '#F97316';       // Fear - Orange
    if (value <= 55) return '#F59E0B';       // Neutral - Amber
    if (value <= 75) return '#84CC16';       // Greed - Lime
    return '#22C55E';                         // Extreme Greed - Green
  }

  function getGaugeLabel(value) {
    if (value <= 25) return 'Extreme Fear';
    if (value <= 45) return 'Fear';
    if (value <= 55) return 'Neutral';
    if (value <= 75) return 'Greed';
    return 'Extreme Greed';
  }

  function createGauge(canvasId, value) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const color = getGaugeColor(value);

    if (gaugeChart) {
      gaugeChart.data.datasets[0].data = [value, 100 - value];
      gaugeChart.data.datasets[0].backgroundColor = [color, 'rgba(229,231,235,0.3)'];
      gaugeChart.update('none');
      return;
    }

    gaugeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [color, 'rgba(229,231,235,0.3)'],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90,
        circumference: 180,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false }
        },
        animation: {
          animateRotate: true,
          duration: 800
        }
      }
    });
  }

  function createSparkline(canvasId, prices, isPositive) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const color = isPositive ? '#22C55E' : '#EF4444';
    const bgColor = isPositive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';

    // Downsample prices to ~50 points for performance
    const step = Math.max(1, Math.floor(prices.length / 50));
    const sampled = prices.filter((_, i) => i % step === 0);

    if (sparklineCharts[canvasId]) {
      sparklineCharts[canvasId].data.labels = sampled.map((_, i) => i);
      sparklineCharts[canvasId].data.datasets[0].data = sampled;
      sparklineCharts[canvasId].data.datasets[0].borderColor = color;
      sparklineCharts[canvasId].data.datasets[0].backgroundColor = bgColor;
      sparklineCharts[canvasId].update('none');
      return;
    }

    sparklineCharts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sampled.map((_, i) => i),
        datasets: [{
          data: sampled,
          borderColor: color,
          backgroundColor: bgColor,
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        animation: {
          duration: 500
        }
      }
    });
  }

  return {
    createGauge,
    createSparkline,
    getGaugeColor,
    getGaugeLabel
  };
})();
