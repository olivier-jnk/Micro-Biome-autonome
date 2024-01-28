const biome = document.getElementById("biome");
let valeur1 = 1;
let valeur2 = 2;
const value = 0;
setInterval(()=> {
    valeur1 = calculateRandomValue(-1,1)
    valeur2 = calculateRandomValue(-1,1)
},1000)

function Creature(specie, categorie, colorChoosen) {
    this.specie = specie;
    this.categorie = categorie;
    this.vitesseDeplacement = calculateRandomValue(5, 15);
    this.vie = calculateRandomValue(50, 100);
    this.degats = calculateRandomValue(10, 20);
    this.position = { x: 0, y: 0 };
    this.id = specie + categorie + calculateRandomValue(4,10000)
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
    // valeurRandom = calculateRandomValue(valeur1,valeur2);
    // if(valeur1 > 0){ // plutot efficace avec le systeme de valeur 1. Mais reste tout de meme trop aleatoire.
    //     posXDep = calculateRandomValue(0, 1)
    //     posYDep = calculateRandomValue(0, 1)
    // }else{
    //     posXDep = calculateRandomValue(-1, 0)
    //     posYDep = calculateRandomValue(-1, 0)
    // }

    if(this.specie === "Creature1"){
        posXDep = valeur1;
        posYDep = valeur2;
    }else{
        posXDep = calculateRandomValue(-1, 1)
        posYDep = calculateRandomValue(-1, 1)
    }

    // Il faut que le déplacement soit aléatoire mais ait l'air d'etre intentionnel.
    // Surtout dans le cas de déplacements motivés, exemple la faim.
    // Probleme avec cette methode. 1. ca reste toujours trop aleatoire (possibilité d'allers retours répétitifs.) 2. Chaque element va dans la mm
    // direction, pas au meme rythme mais dans la meme direction tout de meme.
    // 3. Deplacement en diagonale, mais pas vraiment utilisation de l'ampleur du terrain.
    // deplacement presque ordoné en groupe peut etre interessant si creation de troupeaux.
    
    // faire en sorte d'aller dans une direction et de dé-désorganiser l'avancée.
    // peut etre calculate random en fonction de si valeur est positive ou négative.
    // trouver moyen d'ordoner d'avantage les déplacement ca peut passer en grosse partie par le repérage dans l'espace.
    // Deplacement organisé, modulable et propre à chacun.
    
    this.position.x += posXDep;
    this.position.y += posYDep;
    getPosValues(posXDep, posYDep, this.id)
};
    

Creature.prototype.effectuerActions = function() {
    // this.feed-- Beaucoup moins régulièrement ou a plus petites doses.
    // Mettre des priorités sur les actions, si feed < 40 mais que prédateur dans les parages, fuite avant tout.    
    // this.feed--
    
    // setInterval(() => {
    //     this.feed--
    //     console.log(this.feed)
    // },5000)
    if(this.vies < 0){
        console.log("c'est la mort !")
    }else{
        if(value > 1){ //predateurAuxAlentours
            // function de fuite 
        }
        else if(this.feed < 40){
            if(this.feed < 0){
                setInterval(() =>{
                    this.vies--
                }, 5000)
            }else{
                console.log("La faim commence à se faire sentir.")
            this.deplacer();
            // function rechercher nourriture.
            }
            
        }
        else if(value > 0){ //PartenaireAuxAlentours && feed > 70 && PartenaireFeed > 70
            // function parades amoureuses et accouplement.
        }else{  
            // errance
            this.deplacer();
            // peut etre revoir toute la methodologie de déplacement surtout lors de la recherche de nourriture. 
            // faire en sorte que le perimetres visualisés (systeme de vision) deviennent innintéressants si il n'y a rien dedans et la creature,
            // va chercher à explorer d'avantage.
            // trainée derriere creature.
            // Odeurs virevoltantes (nourriture)
        }
    }
    // Ajouter le fait que si vies < 0 => décès et que si feed < 0, -1 vie/2000ms
    
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
        this.feed--
        creatures[i].effectuerActions();
    }
}, 200);

function getPosValues (posX, posY,id){
    const posXV = posX;
    const posYV = posY;

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

// Garder un peu d'aleatoire quand aux spécificités de chaque espece MAIS. incorporer un systeme de grandes differences entre les especes.
// Exemple Une premiere espece aura une vie native qui balancera entre 10-20, tandis qu'une autre espece pourra avoir une vie entre 100-200.

// laisser la possibilité de sortir de l'environnement, mais de toute facon si systeme d'intentionalité bien mis en place, aucun element n'aura interet
// à sortir.