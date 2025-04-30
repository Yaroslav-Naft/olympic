const homeScreen = {
  profile: {
    greeting: 'Bonjour 👋',
    location: 'Fortis BC @ 1111 West Georgia St',
  },
  temperature: {
    title: 'ECY - STAT',
    indoorTemp: 'Température intérieure',
    tempPlaceholder: '--°C',
    outdoorTemp: '🌥 {{temp}}°C',
    outdoorTempPlaceHolder: '🌥 --°C',
    humidity: '💨 {{humidity}} % HR',
    humidityPlaceholder: '💨 -- % HR',
    date: '📅 {{date}}',
    datePlaceholder: '📅 N/A',
    setpoint: {
      title: 'Consigne de température',
      controls: {
        decrease: '−',
        increase: '+',
      },
    },
    modes: {
      off: 'Éteint',
      auto: 'Auto',
      heat: 'Chauffage',
      cool: 'Refroidissement',
    },
  },
  meter: {
    fortisBCSuite: 'Compteur Fortis BC Suite',
    rate: 'Débit : {{rate}} BTU/h',
    accumulatedConsumption: 'Conso. cumulée : {{consumption}} BTU',
    monthlyCost: 'Coût mensuel : {{cost}} $ (CAD)',
    waterConsumption: 'Conso. compteur ECF : {{consumption}} L',
  },
  waterDetector: {
    title: 'Détecteur d’eau',
    valveStatus: {
      title: 'État de la vanne de coupure :',
      open: 'Ouverte',
      closed: 'Fermée',
    },
    detectorStatus: {
      title: 'État du détecteur d’eau :',
      noLeak: 'Pas de fuite',
      leak: 'Fuite détectée',
    },
  },
};

export default homeScreen;
export type DemoTranslations = typeof homeScreen;
