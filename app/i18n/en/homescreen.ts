const homeScreen = {
  profile: {
    greeting: 'Hello 👋',
    location: 'Fortis BC @ 1111 West Georgia St',
  },
  temperature: {
    title: 'ECY - STAT',
    indoorTemp: '{{temp}}°C',
    indoorTempLabel: 'Indoor Temperature',
    indoorTempPlaceholder: '--°C',
    outdoorTemp: '🌥 {{temp}}°C',
    outdoorTempPlaceHolder: '🌥 --°C',
    humidity: '💨 {{humidity}}% RH',
    humidityPlaceholder: '💨 --% RH',
    date: '📅 {{date}}',
    datePlaceholder: '📅 N/A',
    setpoint: {
      title: 'Temperature Set Point',
      controls: {
        decrease: '−',
        increase: '+',
      },
    },
    modes: {
      off: 'Off',
      auto: 'Auto',
      heat: 'Heat',
      cool: 'Cool',
    },
  },
  meter: {
    fortisBCSuite: 'Fortis BC Suite Meter',
    rate: 'Rate: {{value}} BTU/hr',
    accumulatedConsumption: 'Accum. Consumption: {{value}} BTU',
    monthlyCost: 'Monthly Cost: {{value}} $',
    waterConsumption: 'DCW Meter Consumption: {{value}} L',
  },
  waterDetector: {
    title: 'Water Detector',
    valveStatus: {
      title: 'Shutoff Valve Status:',
      open: 'Open',
      closed: 'Closed',
    },
    detectorStatus: {
      title: 'Water Detector Status:',
      noLeak: 'No Leak',
      leak: 'Leak Detected',
    },
  },
};

export default homeScreen;
export type DemoTranslations = typeof homeScreen;
