const homescreenFr = {
  title: 'ECY - STAT',
  profile: {
    greeting: 'Bonjour 👋',
    location: 'Fortis BC @ 1111 West Georgia St',
  },
  temperature: {
    indoorTemp: 'Température intérieure',
    outdoorTemp: '🌥 {temp}°C',
    humidity: '💨 {humidity}% HR',
    date: '📅 {date}',
    setpoint: {
      title: 'Point de consigne de température',
      controls: {
        decrease: '−',
        increase: '+',
      },
    },
    modes: {
      off: 'Arrêt',
      auto: 'Auto',
      heat: 'Chauffage',
      cool: 'Climatisation',
    },
  },
  meter: {
    rate: 'Débit : {rate} BTU/h',
    accumulatedConsumption: 'Consommation cumulée : {consumption} BTU',
    monthlyCost: 'Coût mensuel : {cost} $ (CAD)',
    waterConsumption: "Consommation d'eau : {consumption} L",
  },
  waterDetector: {
    valveStatus: {
      title: "État de la vanne d'arrêt :",
      open: 'Ouverte',
      closed: 'Fermée',
    },
    detectorStatus: {
      title: "État du détecteur d'eau :",
      noLeak: 'Pas de fuite',
      leak: 'Fuite détectée',
    },
  },
};

export default homescreenFr;
export type DemoTranslations = typeof homescreenFr;
