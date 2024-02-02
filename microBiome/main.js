const biome = document.getElementById("biome");
let valeur1 = 1;
let valeur2 = 2;
const value = 0;
setInterval(()=> {
    valeur1 = calculateRandomValue(-1,1)
    valeur2 = calculateRandomValue(-1,1)
},1000)

function Creature(specie, categorie, predateur,sexe, colorChoosen) {
    this.specie = specie;
    this.color = colorChoosen;
    this.categorie = categorie;
    this.predateur = predateur; // definition du predateur de la creature // plus tard en set plusieurs.
    this.vitesseDeplacement = calculateRandomValue(5, 15); // Innutilisé pour l'instant.
    this.vie = calculateRandomValue(50,100); //calculateRandomValue(50, 100)
    this.degats = calculateRandomValue(10, 20);
    this.position = { x: calculateRandomValue(10,20), y: calculateRandomValue(10,20)}; // 10, 80 normalement.
    this.rayonPerimetre = 15; // perimetre plutot bon. // peut etre plus.
    this.id = specie + categorie + calculateRandomValue(1,10000);
    this.sexe = sexe;
    this.mating = 0;
    this.mating = 0;
    this.feed = calculateRandomValue(80,100); // 100
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
            
            let dist = distance < this.rayonPerimetre;

            if(dist === true){
                if(creature.specie === this.predateur){
                    console.log(this.specie + " dit : Prédateur aux alentours. " + creature.specie)
                }
                else if(creature.specie === this.specie){
                    console.log(this.specie + " animal de la meme espece dans les alentours. " + creature.specie)
                    if(this.feed > 70 && creature.feed > 70 && this.sexe != creature.sexe && this.mating < 1 && creature.mating < 1){
                        console.log("accouplement possible")

                        // que faire si les deux feed sont au meme niveau ?
                        // peut etre trouver un autre moyen. critere male/ femelle par exemple. ou indice superieur ou inferieur.
                        // accouplement possible.
                        if(this.feed < creature.feed){
                            // rien faire (l'autre espece s'occupe d'effectuer l'action.)
                        }
                        else if(this.feed > creature.feed){
                            // La dans ce cas, c'est la creature qui initie l'accouplement. 
                            // methode pour eviter les double accouplements.
                            newCreature2(calculateRandomValue(1,1000), this.categorie, "pouleJunior","male","#2F653E" )
                            // faire plus tard en sorte que l'enfant pop, à côté des parents + qu'il ait
                            // des spécificités à lui
                            // + faire en sorte que plusieurs enfants puissent apparaitrent
                            // et que les enfants ne puissent pas s'accoupler entre eux.
                            // mettre un cooldown de reproduction apres ca.
                            // faire en sorte que ne soit pas possible un double accouplement.
                            // faire un systeme de grossesse ? 
                        }
                        this.mating = 1; // empeche les accouplements infinies.
                    }
                }
                this.deplacer()

            }else{
                // console.log("false")
                this.deplacer()
            }
            // fonctionnel ainsi et BEAUCOUP plus efficace car possibilité d'acceder au infos de la creature et de celle
            // dans les alentours.
        }
        return false;
    });
};

Creature.prototype.calculerDistance = function(point1, point2) {
    const deltaX = point1.x - point2.x;
    const deltaY = point1.y - point2.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

const creatures = [
    new Creature("poule","mobile","renard","male","grey"),
    new Creature("poule","mobile","renard","male","grey"),
    new Creature("poule","mobile","renard","male","grey"),
    new Creature("poule","mobile","renard","femelle","grey"),
];

function newCreature() {
    let creature = prompt("Nom de la créature");
    let spe = prompt("Mobile ou immobile");
    let predateur = prompt("predateur")
    let couleur = prompt("Couleur");
    
    let newCreatureInstance = new Creature(creature, spe, predateur, couleur);

    creatures.push(newCreatureInstance);
}

function newCreature2(creature, spe, predateur,sexe, couleur) {
    // plus tard set TOUS LES parametres.
    // etablir un moyen pour cloner tous les attributs classiques de la creature parent.
    // Faire en sorte que le nouveau né pop au meme endroit que le parent.
    let newCreatureInstance = new Creature(creature, spe, predateur,sexe, couleur);

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

setInterval(() => {
    for(i = 0; i < creatures.length; i++){
        creatures[i].mating = 0;
        // Pas la meilleure maniere car timer peu tomber juste apres un accouplement.
        // trouver un moyen plus personnalisé à chaque creature.
    }
},10000)

// async function CKill (KillCId){
    
// }

// faire une fonction speciale de kill creature. possible que à partir de l'id de la creature glissé en paramètre.
// d'abord suppression de l'objet puis quelques secondes apres element html.