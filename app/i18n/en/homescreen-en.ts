const homeScreen = {
  title: 'ECY - STAT',
  profile: {
    greeting: 'Hello 👋',
    location: 'Fortis BC @ 1111 West Georgia St',
  },
  temperature: {
    indoorTemp: 'Indoor Temperature',
    outdoorTemp: '🌥 {{temp}}°C',
    humidity: '💨 {{humidity}}% RH',
    date: '📅 {{date}}',
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
    rate: 'Rate: {{rate}} BTU/hr',
    accumulatedConsumption: 'Accum. Consumption: {{consumption}} BTU',
    monthlyCost: 'Monthly Cost: {{cost}} $ (CAD)',
    waterConsumption: 'DCW Meter Consumption: {{consumption}} L',
  },
  waterDetector: {
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
