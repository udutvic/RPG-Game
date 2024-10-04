let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["палиця"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "палиця", power: 5 },
  { name: "кинджал", power: 30 },
  { name: "молот", power: 50 },
  { name: "меч", power: 100 },
];
const monsters = [
  {
    name: "слиз",
    level: 2,
    health: 15,
  },
  {
    name: "ікластий звір",
    level: 8,
    health: 60,
  },
  {
    name: "дракон",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "площа міста",
    "button text": ["Йти до магазину", "Йти до печери", "Битися з драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Ви на площі міста. Ви бачите знак, на якому написано "Магазин".',
  },
  {
    name: "магазин",
    "button text": [
      "Купити 10 здоров'я (10 золота)",
      "Купити зброю (30 золота)",
      "Повернутися на площу",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ви заходите в магазин.",
  },
  {
    name: "печера",
    "button text": [
      "Битися зі слизом",
      "Битися з ікластим звіром",
      "Повернутися на площу",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Ви заходите в печеру. Ви бачите кілька монстрів.",
  },
  {
    name: "битва",
    "button text": ["Атакувати", "Уникнути", "Втекти"],
    "button functions": [attack, dodge, goTown],
    text: "Ви б'єтесь з монстром.",
  },
  {
    name: "вбити монстра",
    "button text": [
      "Повернутися на площу",
      "Повернутися на площу",
      "Повернутися на площу",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'Монстр кричить "Дідько!" перед тим, як померти. Ви отримуєте досвід і знаходите золото.',
  },
  {
    name: "поразка",
    "button text": ["ПЕРЕГРАТИ?", "ПЕРЕГРАТИ?", "ПЕРЕГРАТИ?"],
    "button functions": [restart, restart, restart],
    text: "Ви помираєте. &#x2620;",
  },
  {
    name: "перемога",
    "button text": ["ПЕРЕГРАТИ?", "ПЕРЕГРАТИ?", "ПЕРЕГРАТИ?"],
    "button functions": [restart, restart, restart],
    text: "Ви перемагаєте дракона! ВИ ВИГРАЛИ ГРУ! &#x1F389;",
  },
  {
    name: "пасхалка",
    "button text": ["2", "8", "Повернутися на площу?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Ви знайшли таємну гру. Оберіть номер вище. Буде випадково обрано десять чисел між 0 і 10. Якщо ваше число співпаде з одним із випадкових, ви виграли!",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У вас недостатньо золота для покупки здоров'я.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Тепер у вас " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " У вашому інвентарі: " + inventory.join(", ");
    } else {
      text.innerText = "У вас недостатньо золота для покупки зброї.";
    }
  } else {
    text.innerText = "У вас вже є найсильніша зброя!";
    button2.innerText = "Продати зброю за 15 золота";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ви продали " + currentWeapon + ".";
    text.innerText += " У вашому інвентарі: " + inventory.join(", ");
  } else {
    text.innerText = "Не продавайте свою єдину зброю!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "Монстр " + monsters[fighting].name + " атакує.";
    text.innerText += " Ви атакуєте його своєю зброєю " + weapons[currentWeapon].name + ".";   
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Ви промахнулися.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    if (weapons.name === "палиця") {
      text.innerText += " Ваша " + inventory.pop() + " зламалася.";
    } else {
      text.innerText += " Ваш " + inventory.pop() + " зламався.";
    }
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "Ви ухиляєтесь від атаки монстра " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
  easterEgg();
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["палиця"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Ви вибрали " + guess + ". Ось випадкові числа:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Вірно! Ви виграли 20 золота!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Неправильно! Ви втратили 10 здоров'я!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
