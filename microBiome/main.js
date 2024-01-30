const biome = document.getElementById("biome");
let valeur1 = 1;
let valeur2 = 2;
const value = 0;
setInterval(()=> {
    valeur1 = calculateRandomValue(-1,1)
    valeur2 = calculateRandomValue(-1,1)
},1000)

function Creature(specie, categorie, predateur, colorChoosen) {
    this.specie = specie;
    this.color = colorChoosen;
    this.categorie = categorie;
    this.predateur = predateur; // definition du predateur de la creature // plus tard en set plusieurs.
    this.vitesseDeplacement = calculateRandomValue(5, 15); // Innutilisé pour l'instant.
    this.vie = calculateRandomValue(50,100); //calculateRandomValue(50, 100)
    this.degats = calculateRandomValue(10, 20);
    this.position = { x: calculateRandomValue(10,80), y: calculateRandomValue(10,80)};
    this.rayonPerimetre = 15; // perimetre plutot bon. // peut etre plus.
    this.id = specie + categorie + calculateRandomValue(1,10000);
    this.feed = 100; // 100
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
    let id = this.id;
    // console.log(this.position.x + " position x")
    if(this.position.x > 80){
        // console.log("x + 100")
        posXDep = calculateRandomValue(-2,-1)
        posYDep = calculateRandomValue(-1,1)
    }
    else if (this.position.x < 0){
        posXDep = calculateRandomValue(1,2)
        posYDep = calculateRandomValue(-1,1)
    }
    else if (this.position.y > 100){
        posXDep = calculateRandomValue(-1,1)
        posYDep = calculateRandomValue(-2,-1)
    }
    else if (this.position.y < 10){
        posXDep = calculateRandomValue(-1,1)
        posYDep = calculateRandomValue(1,2)
    }// Compacter le tout.
    else if(this.specie === "Creature1"){ // test de déplacement spécifique à une créature. semble moins aleatoire d'apparence.
        posXDep = valeur1;
        posYDep = valeur2;
    }else{
        posXDep = calculateRandomValue(-1, 1)
        posYDep = calculateRandomValue(-1, 1)
    }
    // faire en fonction des parametres envoyés. si prédateur ou faim...

    this.position.x += posXDep;
    this.position.y += posYDep;
    const posXV = posXDep;
    const posYV = posYDep;

    let dot = document.getElementById(id)

    dot.style.left = this.position.x + "%";
    dot.style.top = this.position.y + "%";
};
    

Creature.prototype.effectuerActions = function() {

    const creaturesAutour = creatures.filter(creature => {
        if (creature.id !== this.id) {
            const distance = this.calculerDistance(this.position, creature.position);
            this.creatureProche = creature.specie; // envoie à la bille la creature qui rentre dans sa zone. // pb si plusieurs creatures.
            // Possibilité d'utiliser cette methode pour stocker des infos dans la "memoire" de la bille.
            return distance < this.rayonPerimetre; // return aussi la creature autour.
        }
        return false;
    });

    // if(this.vies < 0){
    //     console.log("c'est la mort !")
    // }
    // else if(this.feed < 40){ 
    //     if(this.feed < 0){
    //         setInterval(() =>{
    //             console.log("la faim vous ronge" + this.id)
    //             this.vies--
    //             console.log("La faim vous retire de la vie.")
    //         }, 5000)
    //     }else{
    //         console.log("La faim commence à se faire sentir.")
    //         this.deplacer();
    //     // function rechercher nourriture.
    //     }
    // }else{

    if(creaturesAutour.length > 0){ //predateurAuxAlentours // Fonctionnalitée completement buggé ! QUOIQUE ?
        console.log("creature aux alentours.")
        // console.log("Creature aux alentours !" + " cible = " + this.id + "creature = " + this.creatureProche)
        if(this.creatureProche === this.predateur){ // probleme ca reste ancré.
            console.log(this.specie + " dit : Prédateur aux alentours. " + this.creatureProche)
        }
        if(this.creatureProche === this.specie){
            console.log(this.specie + " animal de la meme espece dans les alentours. " + this.creatureProche)
            if(this.feed > 70){
                // probleme de double accouplement (les deux font l'action)
                // faire en sorte de recup la feed des 2 + de faire en sorte que ce soit celui le plus nourri qui effectue
                // L'action.
                // patcher le probleme de reproduction infinie. nouveau né se reproduit...
                newCreature2(calculateRandomValue(1,1000), this.categorie, "joe", "orange" )
            }
        }
            this.deplacer(); // donner des instructions de deplacement spécifique en parametre OU function speciale de fuite.
    }else{  
        // errance
        this.deplacer();
    }
};

Creature.prototype.calculerDistance = function(point1, point2) {
    const deltaX = point1.x - point2.x;
    const deltaY = point1.y - point2.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

const creatures = [
    new Creature("joe", "mobile","renard","grey"),
    new Creature("jean", "mobile","vipere","grey"), // renard orange
    new Creature("jack", "mobile","poule","grey"), // vipere green
];

function newCreature() {
    let creature = prompt("Nom de la créature");
    let spe = prompt("Mobile ou immobile");
    let predateur = prompt("predateur")
    let couleur = prompt("Couleur");
    
    let newCreatureInstance = new Creature(creature, spe, predateur, couleur);

    creatures.push(newCreatureInstance);
}

function newCreature2(creature, spe, predateur, couleur) {
    // plus tard set TOUS LES parametres.
    // etablir un moyen pour cloner tous les attributs classiques de la creature parent.
    // Faire en sorte que le nouveau né pop au meme endroit que le parent.
    let newCreatureInstance = new Creature(creature, spe, predateur, couleur);

    creatures.push(newCreatureInstance);
} // regrouper les 2 plus tard ! ou modifier clairement le nom.

function popC(){
    let newClassicC = new Creature ("classique","classique", "poule","pink")
    creatures.push(newClassicC)
}

setInterval(function() {
    for (i = 0; i < creatures.length; i++) { 
        creatures[i].effectuerActions();
    }
}, 200);

setInterval(() =>{
    for(i = 0; i < creatures.length; i++){
        if(creatures[i].vie <= 0){
            let idDeadC = creatures[i].id;
            delete creatures[i];

            let HDeadC = document.getElementById(idDeadC);
            HDeadC.remove();

            // CKill(idDeadC);

            // disparition totale un peu abrupte. faire fonctionner le systeme de setTimeout.
            
            
            
            // conflit j'ai l'impression quand suppression de deux creatures en mm temps. 

            // setTimeout(() => {
            //     let idDeadC1 = creatures[i].id
            //     const deadC = document.getElementById(idDeadC1);
            //     deadC.remove();
            // },5000)
            // fonctionne pas.

        }else{
            creatures[i].feed--
            if (creatures[i].feed <= 0){
                creatures[i].vie--
            }
        }
        console.log("premiere itération.")
    }
    console.log("retrait de nourriture général.")
}, 5000)

// async function CKill (KillCId){
    
// }


// faire une fonction speciale de kill creature. possible que à partir de l'id de la creature glissé en paramètre.
// d'abord suppression de l'objet puis quelques secondes apres html.