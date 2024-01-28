const biome = document.getElementById("biome");

function Creature(espece, categorie, colorChoosen) {
    this.espece = espece;
    this.categorie = categorie;
    this.vitesseDeplacement = calculateRandomValue(5, 15);
    this.vie = calculateRandomValue(50, 100);
    this.degats = calculateRandomValue(10, 20);
    this.position = { x: 0, y: 0 };
    this.id = espece + categorie + calculateRandomValue(4,10000)
    this.feed = 100;
    //mieux générer l'id pour éviter les paires.
    let creatureCreated = document.createElement("div")
    creatureCreated.className = "dot";
    creatureCreated.id = this.id;
    biome.appendChild(creatureCreated)
    let idC = document.getElementById(this.id)
    idC.style.backgroundColor = colorChoosen;
}

function calculateRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Creature.prototype.deplacer = function() {
    posXDep = calculateRandomValue(-1, 1)
    posYDep = calculateRandomValue(-1, 1)

    this.position.x += posXDep;
    this.position.y += posYDep;
    getPosValues(posXDep, posYDep, this.id)
};

Creature.prototype.effectuerActions = function() {
    // this.feed-- Beaucoup moins régulièrement ou a plus petites doses.
    this.deplacer();
    // Possibilité d'ajouter d'autres actions comme la fuite si prédateur dans les parages, recherche de nourriture si faim, combat...
};

const creatures = [
    new Creature("Creature1", "mobile","black"),
    new Creature("Creature2", "mobile","red"),
    new Creature("Creature3", "mobile","blue"),
];

function newCreature() {
    let creature = prompt("Nom de la créature");
    let spe = prompt("Mobile ou immobile");
    let couleur = prompt("Couleur");
    // faire une barre qui pop, au lieu du prompt qui stoppe tout.
    
    let newCreatureInstance = new Creature(creature, spe, couleur);

    creatures.push(newCreatureInstance);
}

function popC(){
    let newClassicC = new Creature ("classique","classique","pink")
    creatures.push(newClassicC)
}

setInterval(function() {
    for (i = 0; i < creatures.length; i++) { 
        creatures[i].effectuerActions();
    }
}, 100);


function getPosValues (posX, posY,id){
    const posXV = posX;
    const posYV = posY;
    creatureId = id;

    let dot = document.getElementById(id)

    const styles = window.getComputedStyle(dot);
    
    const leftValueInPixels = parseFloat(styles.getPropertyValue('left'));

    const parentWidthInPixels = dot.parentElement.clientWidth;

    const leftValueInPercentage = (leftValueInPixels / parentWidthInPixels) * 100;

    const topValueInPixels = parseFloat(styles.getPropertyValue('top'));

    const parentHeightInPixels = dot.parentElement.clientHeight;

    const topValueInPercentage = (topValueInPixels / parentHeightInPixels) * 100;

    initMoov(leftValueInPercentage,topValueInPercentage,posXV,posYV,dot);
}

function initMoov(leftVal,topVal,nombreAleatoire, nombreAleatoire2,dot){
    dot.style.left = leftVal + nombreAleatoire + "%";
    dot.style.top = topVal + nombreAleatoire2 + "%";
}

// deplacement toujours trop saccadé, incorporer la logique de but dans le déplacement (aller vers une direction et pas deplacement completement 
// aleatoire. )

// apparition aléatoire ou dans un endroit particulier.

// terrain illimité peut etre tres intéressant.
