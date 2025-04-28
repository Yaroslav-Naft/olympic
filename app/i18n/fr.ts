import demoFr from './demo-fr';

const fr = {
  common: {
    ok: 'OK !',
    cancel: 'Annuler',
    back: 'Retour',
    logOut: 'Déconnexion',
  },
  welcomeScreen: {
    postscript:
      "Cette application est la propriété d'Olympic Controls Inc. L'utilisation, la reproduction, la distribution ou la modification non autorisée de toute partie de cette application est strictement interdite. Tous droits réservés",
    readyForLaunch: "Bienvenue dans l'application olympic !",
    exciting: 'Développé par Yaro & Tommy 🤗',
    letsGo: 'Allons-y !',
  },
  errorScreen: {
    title: 'Une erreur est survenue !',
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur se produit. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement la mise en page également (`app/screens/ErrorScreen`). Si vous souhaitez le supprimer complètement, consultez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: 'Erreur de la pile %{name}',
  },
  emptyStateComponent: {
    generic: {
      heading: 'Si vide... si triste',
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour actualiser ou recharger l'application.",
      button: 'Essayons à nouveau',
    },
  },

  errors: {
    invalidEmail: 'Adresse e-mail invalide.',
  },
  loginScreen: {
    logIn: 'Se connecter',
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce qui vous attend. Ou peut-être que si ; ce n'est pas de la science-fiction ici.",
    emailFieldLabel: 'E-mail',
    passwordFieldLabel: 'Mot de passe',
    emailFieldPlaceholder: 'Entrez votre adresse e-mail',
    passwordFieldPlaceholder: 'Mot de passe super secret ici',
    tapToLogIn: 'Appuyez pour vous connecter !',
    hint: "Indice : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
  demoNavigator: {
    componentsTab: 'Composants',
    homeTab: 'Accueil',
    calendarTab: 'Calendrier',
    comfortTab: 'Confort',
    settingsTab: 'Paramètres',
    debugTab: 'Débogage',
    communityTab: 'Communauté',
    podcastListTab: 'Paramètres',
  },
  navigator: {
    homeTab: 'Accueil',
    calendarTab: 'Calendrier',
    comfortTab: 'Confort',
    settingsTab: 'Paramètres',
  },
  demoCommunityScreen: {
    title: 'Suite 123\nLocataire : Fortis BC',
    tagLine: 'Bienvenue sur votre portail !🤗🤗🤗',
    joinUsOnSlackTitle: 'Rejoignez-nous sur Slack',
    joinUsOnSlack:
      "Vous souhaitez un endroit pour vous connecter avec des ingénieurs React Native du monde entier ? Rejoignez la conversation dans la communauté Slack d'Infinite Red ! Notre communauté grandissante est un espace sûr pour poser des questions, apprendre des autres et développer votre réseau.",
    joinSlackLink: 'Rejoindre la communauté Slack',
    makeIgniteEvenBetterTitle: 'Rendez Ignite encore meilleur',
    makeIgniteEvenBetter:
      "Vous avez une idée pour rendre Ignite encore meilleur ? Nous sommes heureux de l'entendre ! Nous cherchons toujours d'autres personnes qui veulent nous aider à construire les meilleurs outils React Native. Rejoignez-nous sur GitHub pour nous aider à construire l'avenir d'Ignite.",
    contributeToIgniteLink: 'Contribuer à Ignite',
    theLatestInReactNativeTitle: 'Les dernières nouveautés de React Native',
    theLatestInReactNative:
      'Nous sommes là pour vous tenir informé de tout ce que React Native a à offrir.',
    reactNativeRadioLink: 'React Native Radio',
    reactNativeNewsletterLink: 'Newsletter React Native',
    reactNativeLiveLink: 'React Native Live',
    chainReactConferenceLink: 'Conférence Chain React',
    hireUsTitle: 'Engagez Infinite Red pour votre prochain projet',
    hireUs:
      "Que ce soit pour gérer un projet complet ou pour former des équipes avec notre formation pratique, Infinite Red peut vous aider avec presque n'importe quel projet React Native.",
    hireUsLink: 'Envoyez-nous un message',
  },
  homeScreen: {
    title: 'Suite 123\nLocataire : Fortis BC',
    tagLine: 'Bienvenue sur votre portail !🤗🤗🤗',
    indoorTemp: 'Température intérieure',
  },
  demoShowroomScreen: {
    jumpStart: 'Des composants pour démarrer votre projet !',
    lorem2Sentences:
      'Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.',
    demoHeaderTxExample: 'Super',
    demoViaTxProp: 'Via la prop `tx`',
    demoViaSpecifiedTxProp: 'Via la prop `{{prop}}Tx`',
  },
  demoDebugScreen: {
    howTo: 'COMMENT FAIRE',
    title: 'Débogage',
    tagLine:
      "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
    reactotron: 'Envoyer à Reactotron',
    reportBugs: 'Signaler des bugs',
    demoList: 'Liste de démonstration',
    demoPodcastList: 'Liste de podcasts de démonstration',
    androidReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 depuis votre terminal, et rechargez l'application.",
    iosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    macosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    webReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    windowsReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
  },
  demoPodcastListScreen: {
    title: 'Épisodes de React Native Radio',
    onlyFavorites: 'Afficher uniquement les favoris',
    favoriteButton: 'Favori',
    unfavoriteButton: 'Retirer des favoris',
    accessibility: {
      cardHint:
        "Double-tapez pour écouter l'épisode. Double-tapez et maintenez pour {{action}} cet épisode.",
      switch: "Activez pour n'afficher que les favoris",
      favoriteAction: 'Basculer les favoris',
      favoriteIcon: 'Épisode non favori',
      unfavoriteIcon: 'Épisode favori',
      publishLabel: 'Publié le {{date}}',
      durationLabel: 'Durée : {{hours}} heures {{minutes}} minutes {{seconds}} secondes',
    },
    noFavoritesEmptyState: {
      heading: "C'est un peu vide",
      content:
        "Aucun favori n'a encore été ajouté. Appuyez sur le cœur d'un épisode pour l'ajouter à vos favoris !",
    },
  },

  ...demoFr,
};

export default fr;
export type Translations = typeof fr;
