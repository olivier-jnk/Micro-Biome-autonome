setInterval(() => {
    const nombreAleatoire = Math.random() * 2 - 1;
    const nombreAleatoire2 = Math.random() * 2 - 1;
    getPosValues(nombreAleatoire, nombreAleatoire2);
    
},100)

setInterval(() => {
    const nombreAleatoire = Math.random() * 2 - 1;
    const nombreAleatoire2 = Math.random() * 2 - 1;
    getPosValues1(nombreAleatoire, nombreAleatoire2);
    
},100)

function getPosValues (nombreAleatoire, nombreAleatoire2){
    const directionPlus = nombreAleatoire ;
    const directionPlus2 = nombreAleatoire2;

    let dot = document.getElementById("dot")

    const styles = window.getComputedStyle(dot);

    const leftValueInPixels = parseFloat(styles.getPropertyValue('left'));

    const parentWidthInPixels = dot.parentElement.clientWidth;

    const leftValueInPercentage = (leftValueInPixels / parentWidthInPixels) * 100;

    const topValueInPixels = parseFloat(styles.getPropertyValue('top'));

    const parentHeightInPixels = dot.parentElement.clientHeight;

    const topValueInPercentage = (topValueInPixels / parentHeightInPixels) * 100;
    // console.log(leftValueInPercentage + topValueInPercentage);
    initMoov(leftValueInPercentage,topValueInPercentage,directionPlus,directionPlus2);
}

function initMoov(leftVal,topVal,nombreAleatoire, nombreAleatoire2){
    dot.style.left = leftVal + nombreAleatoire + "%";
    dot.style.top = topVal + nombreAleatoire2 + "%";
}


//


function getPosValues1 (nombreAleatoire, nombreAleatoire2){
    const directionPlus = nombreAleatoire ;
    const directionPlus2 = nombreAleatoire2;

    let dotUn = document.getElementById("dotUn")

    const styles = window.getComputedStyle(dotUn);

    const leftValueInPixels = parseFloat(styles.getPropertyValue('left'));

    const parentWidthInPixels = dotUn.parentElement.clientWidth;

    const leftValueInPercentage = (leftValueInPixels / parentWidthInPixels) * 100;

    const topValueInPixels = parseFloat(styles.getPropertyValue('top'));

    const parentHeightInPixels = dotUn.parentElement.clientHeight;

    const topValueInPercentage = (topValueInPixels / parentHeightInPixels) * 100;
    // console.log(leftValueInPercentage + topValueInPercentage);
    initMoov1(leftValueInPercentage,topValueInPercentage,directionPlus,directionPlus2);
}

function initMoov1(leftVal,topVal,nombreAleatoire, nombreAleatoire2){
    dotUn.style.left = leftVal + nombreAleatoire + "%";
    dotUn.style.top = topVal + nombreAleatoire2 + "%";
}

// faire en sorte que la trajectoire ne dévie pas trop. Pas mode crise d'epilepsie. Il peut y'avoir quelques déviations, mais que ca paraisse au plus naturel.
// Moments de mouvement pour mouvement, moments de mouvement pour but et mouvement d'immobilité voir innaction totale.
// Changements d'etats et de comportements en fonction des zones.

// faire en sorte que le code soit modulable pour ne pas répéter deux fois le meme code en changeant juste l'id du dot. Il faut que un code puisse,
// S'occuper de la gestion de déplacement de plusieurs elements en meme temps.