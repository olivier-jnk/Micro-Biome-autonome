const biome = document.getElementById("biome");
let valeur1 = 1;
let valeur2 = 2;
const value = 0;
// let predateur = 0;
// let proie = 1;
// let predation = 0;
let relation = 0;

setInterval(()=> {
    valeur1 = calculateRandomValue(-1,1)
    valeur2 = calculateRandomValue(-1,1)
},1000)

function Creature(specie, categorie, predateur,proie,sexe, colorChoosen) {
    this.specie = specie;
    this.categorie = categorie;
    this.predateur = predateur; // definition du predateur de la creature // plus tard en set plusieurs.
    this.proie = proie;
    this.vitesseDeplacement = calculateRandomValue(5, 15); // Innutilisé pour l'instant.
    this.vie = calculateRandomValue(50,100); //calculateRandomValue(50, 100)
    this.color = colorChoosen;
    this.degats = calculateRandomValue(10, 20);
    this.position = { x: calculateRandomValue(10,20), y: calculateRandomValue(10,20)}; // 10, 80 normalement.
    this.rayonPerimetre = 15; // perimetre plutot bon. // peut etre plus.
    this.id = specie + categorie + calculateRandomValue(1,10000);
    this.sexe = sexe;
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

Creature.prototype.deplacer = function(relation,c1X,c1Y,cProcheX,cProcheY) {
    let id = this.id;
    // encore une organisation pas tres efficace du code surment.
    if(relation === -1){ // relation = proie qui repere un predateur.
        if(cProcheX < c1X){
            // console.log("predateur X < proie X")
            posXDep = calculateRandomValue(1,2)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(1,4);
            }
            else{
                posYDep = calculateRandomValue(-4,-1);
            }
        }
        else{
            // console.log("predateur X > proieX")
            posXDep = calculateRandomValue(-4, -1)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(1,4);
            }
            else{
                posYDep = calculateRandomValue(-4,-1);
            }
        }
    }
    else if(relation === 1){ // sup à 0 donc le processus de predation concerne le predateur (poursuite.)
        // Faire en sorte que parfois pour certaines raisons. le predateur ne poursuive pas forcement la proie.
        if(cProcheX < c1X){
            // console.log("predateur X < proie X")
            posXDep = calculateRandomValue(1,2)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(1,2);
            }
            else{
                posYDep = calculateRandomValue(-2,-1);
            }
        }
        else{
            // console.log("predateur X > proieX")
            posXDep = calculateRandomValue(-2, -1)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(1,2);
            }
            else{
                posYDep = calculateRandomValue(-2,-1);
            }
        }
    }
    else if(relation === 2){
        if(cProcheX < c1X){
            // console.log("predateur X < proie X")
            posXDep = calculateRandomValue(-2,-1)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(-2,-1);
            }
            else{
                posYDep = calculateRandomValue(1,2);
            }
        }
        else{
            // console.log("predateur X > proieX")
            posXDep = calculateRandomValue(1, 2)
            if(cProcheY < c1Y){
                posYDep = calculateRandomValue(-2,-1);
            }
            else{
                posYDep = calculateRandomValue(1,2);
            }
        }
    }

    else if(this.position.x > 80){
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
    // const posXV = posXDep;
    // const posYV = posYDep;

    let dot = document.getElementById(id)

    dot.style.left = this.position.x + "%";
    dot.style.top = this.position.y + "%";
};
    
Creature.prototype.effectuerActions = function() {

    const creaturesAutour = creatures.filter(creature => {
        if (creature.id !== this.id) { 

            const distance = this.calculerDistance(this.position, creature.position);
            
            const dist = distance < this.rayonPerimetre;
            const hit = distance < this.rayonPerimetre / 4; // quand la distance entre 2 creatures et vraiment minime.
            // faire pareil pour l'accouplement. les deux creatures se rejoignent et quand hit. elles s'acccouplent.

            if(dist === true){
                if(creature.specie === this.predateur){
                    console.log(this.specie + " dit : Prédateur aux alentours. " + creature.specie)
                    relation = -1; // -1 indique que le processus de predation concerne la proie.
                    let proieX = this.position.x;
                    let proieY = this.position.y;
                    let predateurX = creature.position.x;
                    let predateurY = creature.position.y;
                    this.deplacer(predateur,proieX,proieY,predateurX,predateurY);
                    // faire en sorte que this.deplacer soit modulable en fonction des parametres qu'on lui donne.
                    
                    // 2 methodes que je vois pour la fuite. 
                    // 1. Calculer la distance entre creature et predateur et faire en sorte qu'il s'aggrandisse.
                    // 2. Prendre les positions du predateur et etre dans le + a chacune de ces pos. Si Xpredateur = 10. +x. a quoique.
                    /// depend puisque si creature est a 9x le + la rapprochera.
                }
                else if(creature.specie === this.proie){
                    if(hit === true){
                        // console.log("hit")
                        let degats = calculateRandomValue(1,5)
                        creature.vie -= degats;
                        // fonctionne à prioris mais toujours bug de disparition quand deces.
                        // peut etre diminuer le nombre de degats/ secondes.
                    }else{
                        // console.log("pas hit")
                    }
                    // Predateur repere sa proie.
                    relation = 1; // 1 indique que le processus de predation concerne la predateur.
                    let predateurX = this.position.x;
                    let predateurY = this.position.y;
                    let proieX = creature.position.x;
                    let proieY = creature.position.y;
                    this.deplacer(predation,proieX,proieY,predateurX,predateurY)

                }
                else if(creature.specie === this.specie){
                    // console.log(this.specie + " animal de la meme espece dans les alentours. " + creature.specie)
                    if(this.feed > 70 && creature.feed > 70 && this.sexe != creature.sexe && this.mating < 1 && creature.mating < 1){
                        relation === 2;
                        let c1X = this.position.x;
                        let c1Y = this.position.y;
                        let cProcheX = creature.position.x;
                        let cProcheY = creature.position.y;
                        this.deplacer(relation, c1X, c1Y,cProcheX,cProcheY)
                        // console.log("accouplement possible")
                        if(hit === true){
                            // que faire si les deux feed sont au meme niveau ?
                            // peut etre trouver un autre moyen. critere male/ femelle par exemple. ou indice superieur ou inferieur.
                            // accouplement possible.
                            if(this.feed < creature.feed){
                                // rien faire (l'autre espece s'occupe d'effectuer l'action.)
                            }
                            else if(this.feed > creature.feed){
                                // La dans ce cas, c'est la creature qui initie l'accouplement. 
                                // methode pour eviter les double accouplements.
                                newCreature2(this.specie, this.categorie,this.predateur, this.proie, this.sexe,this.color)
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
                }
                this.deplacer();

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
    new Creature("poule","mobile","renard","undefined","male","grey"),
    // new Creature("renard","mobile","vipere","poule","male","orange"),
    // new Creature("vipere","mobile","poule","renard","male","green"),
    new Creature("poule","mobile","renard","undefined","femelle","grey"),
    
];

function newCreature() {
    let creature = prompt("Nom de la créature");
    let spe = prompt("Mobile ou immobile");
    let predateur = prompt("predateur")
    let couleur = prompt("Couleur");
    // a ajouter.
    // Ajouter un bouton + poule, + renard ...
    
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
    for (const creature of creatures) { 
        creature.effectuerActions();
    }
}, 200);

setInterval(() =>{
    //i = 0; i < creatures.length; i++
    for(const creature of creatures){ // moyen peut etre de faire un for creature in creatures
        if(creature.vie <= 0){
            // SI suppression d'un element dans le tableau qui n'est pas le dernier dans la liste ca casse TOUTES les boucles for.
            let idDeadC = creature.id;
            delete creature;

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
            creature.feed--
            if (creature.feed <= 0){
                creature.vie--
            }
        }
        // console.log("premiere itération.")
    }
    // console.log("retrait de nourriture général.")
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