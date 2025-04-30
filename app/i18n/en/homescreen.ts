const homeScreen = {
  title: 'ECY - STAT',
  profile: {
    greeting: 'Hello 👋',
    location: 'Fortis BC @ 1111 West Georgia St',
  },
  temperature: {
    indoorTemp: 'Indoor Temperature',
    tempPlaceholder: '--°C',
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
    rate: 'Rate: {{rate}} BTU/hr',
    accumulatedConsumption: 'Accum. Consumption: {{consumption}} BTU',
    monthlyCost: 'Monthly Cost: {{cost}} $ (CAD)',
    waterConsumption: 'DCW Meter Consumption: {{consumption}} L',
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
