/* 
États de notre Tamastudi possibles :
- 🥚 : partie non lancée
- 🐣 : naissance pendant tant qu'il n'a pas fait son 1er caca
Ensuite il devient un "grand" avec une humeur variable
- 😢 : triste 0/5
- 🙁 : pas content 1/5
- 🙂 : normal 2/5
- 😄 : content 3/5
- 🤗 : heureux 4/5
- 🥰 : très heureux 5/5
- 👻 : mort 0/5
Ses envies :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé
*/
const myTama = {
  name: "",
  alive: false,
  fed: 0,
  playfull: 0,
  cleaned: 0,
  lifeDuration: 0,
  desire: "",
};
/*
//*PHASE 0: activez le tamaStudi
1) cliquez sur le bouton du milieu
2)Ajouter un compteur qui attend d'avoir une valeur max de 5 clics 
3)alors on fait naitre notre Tama
*/
const start = () => {
  //1) cliquez sur le bouton du milieu
  const buttonCenter = document.querySelector(
    '.js-button[data-direction="center"]'
  );
  let count = 0;
  buttonCenter.addEventListener("click", () => {
    //2)Ajouter un compteur qui attend d'avoir une valeur max de 5 clics
    count++;
    if (count === 5) {
      //3)alors on fait naitre notre Tama
      birth();
    }
  });
};
/*PHASE 1 :la naissance de mon tama
1)demander le nom de mon personnage
2)fait éclore mon oeuf pour passer au poussin
3)affiche mes vitals
4)affiche le nom de mon tama dans les vitals
5)mettre les scores des vitals à 5
6)afficher les actions
*/

const birth = () => {
  //1)demander le nom de mon personnage
  myTama.name = prompt("Quel nom à votre TamaStudi?");
  //2)fait éclore mon oeuf pour passer au poussin
  showInScreen("🐣");
  //3)affiche mes vitals
  const vitals = document.querySelector(".js-vitals");
  vitals.classList.remove("hidden");
  //4) affiche le nom de mon tama dans les vitals
  const nameDisplay = document.querySelector(".js-tamaName");
  nameDisplay.textContent = myTama.name;
  //5)mettre les scores des vitals à 5
  const defaultScore = 5;
  myTama.fed = defaultScore;
  myTama.playfull = defaultScore;
  myTama.cleaned = defaultScore;
  updateVitals();
  //6)afficher les actions
  const actions = document.querySelector(".js-actions");
  actions.classList.remove("hidden");
  //7)appel de la fonction pour le faire grandir
  evolve();
  //8)Calcul de la durée de vie
  myTama.alive = true;
  calcLifeDuration();
};

/* PHASE 2 : l'évolution de mon Tama
1)attendre que le tama est une premiere envie 
2)il devient grand
*/
const evolve = () => {
  //1)attendre que le tama ait une premiere envie
  const functionToExecute = () => {
    mood();
    cycleOfAdultLife();
  };
  wantsTo(functionToExecute);
};

/*Les envies
Fonction pour gerer 
- 😋 : faim, aléatoire minimum 30 sec et max 1 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 1 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé

1)creer une fonction qu'on va pourvoir appeler plus tard dans notre code
2)stocker les envies de mon tama dans une variable
3)avec un setTimout choisir une envie aléatoire
4)ola durée du setTimout est dynamique et est comprise enetre une valeur max et une valeur min
5)afficher l'envie du tama sur notre écran
6)L'envie de faire caca ne peut etre faite que s'il a déja mangé
*/
const wantsTo = (callback) => {
  const needs = ["😋", "🥱", "💩"];
  //min = 1sec et max =3sec
  const minDuration = 1000;
  const maxDuration = 3000;
  const duration = getRandomInt({
    min: minDuration,
    max: maxDuration,
  });
  setTimeout(() => {
    const randomIndexNeeds = getRandomInt({
      max: needs.length,
    });
    const desire = needs[randomIndexNeeds];
    showInScreen(desire, true);
    if (callback) {
      callback(desire);
    } else {
      showInScreen(desire, true);
    }
  }, duration);
};

/*HUMEUR GENERAL:
Une fonction qui calcul la moyenne des trois indicateurs faim, ennui, propreté de notre Tama
-elle affiche cette moyenne dans les vitals
*/
const mood = () => {
  //parte 1 affichage numérique
  const sum = myTama.fed + myTama.playfull + myTama.cleaned;
  const average = sum / 3;
  const rounded = Math.round(average);
  const displayMood = document.querySelector(".js-mood");
  displayMood.textContent = rounded;
  //partie 2 affichage visuel
  const listOfEmojis = ["😢", "🙁", "🙂", "😄", "🤗", "🥰"];
  showInScreen(listOfEmojis[rounded]);
  //partie 3
  if (rounded === 0) {
    showInScreen("👻");
    myTama.alive = false;
  }
};
/*DUREE DE VIE:
Une fonction qui toutes les minutes,et à jours la durée de vie du Tama
*/
const calcLifeDuration = () => {
  const duration = 60_000; //60sec
  const displayLifeDuration = document.querySelector(".js-life-duration");
  setInterval(() => {
    myTama.lifeDuration++;
    displayLifeDuration.textContent = myTama.lifeDuration;
  }, duration);
};

/*GESTION DE VIE ADULTE
- Notre Tama à une humeur générale
- cette humeur et la moyenne de 3 indicateurs
oui  => mood()
- Ces indicateurs évolue avec le temps
=>A FAIRE
- de temps en temps notre Tama à une "envie"
=> oui wantsto()
- Si on ne répond pas dans les temps
- L'indicateur associé diminue
- Si on répond dans les temps
- L'indicateur augmente
=> A FAIRE
- Et ca continue jusqu'a ce que notre Tama meurt
=> A FAIRE
*/

const cycleOfAdultLife = () => {
  if (myTama.alive) {
    //1)Ces indicateurs évolue avec le temps
    //de temps en temps notre Tama à une "envie"
    const functionToExecute = (desire) => {
      showInScreen(desire, true);
      myTama.desire = desire;
      waitForAction();
    };
    wantsTo(functionToExecute);
  } else {
    showInScreen("👻");
  }
};

let timeoutWaitForAction;
const waitForAction = () => {
  timeoutWaitForAction = setTimeout(() => {
    manageIndicators(myTama.desire, false);
    showInScreen("", true);
    cycleOfAdultLife();
  }, 3000);
};

const buttonsAction = document.querySelectorAll(".js-button-action");
buttonsAction.forEach((button) => {
  button.addEventListener("click", () => {
    const associateDesire = button.getAttribute("data-desire");
    const tamaDesireString = translateEmoji(myTama.desire);
    console.log("click", associateDesire, myTama.desire, desire);
    const isGoodButton = tamaDesireString === associateDesire;
    if (isGoodButton) {
      clearTimeout(timeoutWaitForAction);
      manageIndicators(myTama.desire, isGoodButton);
      cycleOfAdultLife();
    }
  });
});

const translateEmoji = (emoji) => {
  let word = "";
  if (emoji === "😋") word = "eat";
  else if (emoji === "🥱") word = "play";
  else if (emoji === "💩") word = "clean";
  return word;
};

const manageIndicators = (desire, hasSucceeded) => {
  const numberToAdd = hasSucceeded ? +1 : -1;
  const calculName = hasSucceeded ? "addition" : "substraction";
  if (desire === "😋" && verifyIndicatorBeforeCalcul(myTama.fed, calculName)) {
    myTama.fed += numberToAdd;
  } else if (
    desire === "🥱" &&
    verifyIndicatorBeforeCalcul(myTama.playfull, calculName)
  ) {
    myTama.playfull += numberToAdd;
  } else if (
    desire === "💩" &&
    verifyIndicatorBeforeCalcul(myTama.cleaned, calculName)
  ) {
    myTama.cleaned += numberToAdd;
  }
  updateVitals();
  mood();
  if (hasSucceeded) {
    showInScreen("", true);
  }
};

const verifyIndicatorBeforeCalcul = (value, calcul) => {
  if (calcul === "addition") {
    return value < 5;
  } else {
    return value > 0;
  }
  //Vérifier si l'indicateur peut être incrémenter ou décrémenter
  return; //vrai ou faux
};

/*Fonction qui permer d'afficher dans les Vitals la valeurs des indicateurs */
const updateVitals = () => {
  const displayIndicatorEat = document.querySelector(".js-score--eat");
  displayIndicatorEat.textContent = myTama.fed;
  const displayIndicatorPlay = document.querySelector(".js-score--play");
  displayIndicatorPlay.textContent = myTama.playfull;
  const displayIndicatorClean = document.querySelector(".js-score--clean");
  displayIndicatorClean.textContent = myTama.cleaned;
};

/*Fonction qui retourne un nombre aléatoire avec une min et max*/
const getRandomInt = (props) => {
  const max = props.max;
  //oulala la belle ternaire
  const min = props.min ? props.min : 0;
  return Math.floor(Math.random() * (max - min) + min);
};

/*Fonction qui gère l'affichage des emoticone dans l'écran du TAMA*/
const character = document.querySelector(".js-character");
const desire = document.querySelector(".js-desire");
const showInScreen = (display, isDesire) => {
  if (isDesire) {
    desire.textContent = display;
  } else {
    character.textContent = display;
  }
};

//lance la fonction de début de mon TAMA
start();
