// KPPV algorithm using hamming method
// Author: Mendja Wadie

const fs = require('fs'); // node file system
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


fs.readFile('./database.json', (err, databaseContent) => { // reading databse.json file
    const json = JSON.parse(databaseContent.toString());
    const data = json.data;
    const id = data.length + 1; // last id
    const c = { // constraints
        id: id,
        frontend: "Fable",
        backend: "Moyenne",
        fullstack: "?"
    }
    showData(data, c); // display the table of data
    let distances = calculateDistances(data, c); // returns an array of distances
    distances = distances.sort(); console.log(distances) // trie par order croissante 
    results(distances); //  show results
});

function showData(data, c) { // affichage
    console.log(data);
    console.log("  ---------------------------------------------------------  ");
    console.log("    id    |    Backend    |    ForntEnd    |    FullStack    ");
    console.log("  ---------------------------------------------------------  ");
    for (let i = 0; i < data.length; i++) {
        const L = data[i];
        const spaces = L.backend == "Fable" ? "   " : L.backend == "Moyenne" ? " " : "";
        const spaces2 = L.frontend == "Fable" ? "   " : L.frontend == "Moyenne" ? " " : "";
        console.log("     " + L.id + "         " + L.backend + "        " + spaces + L.frontend + "         " + spaces2 + L.fullstack + "    ");
    }
    const spaces = c.backend == "Fable" ? "   " : c.backend == "Moyenne" ? " " : "";
    const spaces2 = c.frontend == "Fable" ? "   " : c.frontend == "Moyenne" ? " " : "";
    console.log("     " + c.id + "         " + c.backend + "        " + spaces + c.frontend + "         " + spaces2 + c.fullstack + "   ");
}

function calculateDistances(data, c) { // calculating distances
    const NM = 3; // nbr de modalité
    const distances = [];
    console.log("\nLes distance: \n--------------");
    for (let i = 0; i < data.length; i++) {
        const counter = i + 1;
        let somme = 0; // f(Xi, Xj)
        if (c.frontend == data[i].frontend) somme += 1;
        if (c.backend == data[i].backend) somme += 1;
        const d = 1 - 1 / 2 * (somme / NM);
        distances.push([d, data[i].fullstack]);
        console.log("D" + counter + " = " + d);
    }
    return distances;
}

function results(distances) { // dispalying results
    readline.question('Entrer K = ', k => {
        let nbrOui, nbrNon;
        for (let i = 0; i < k; i++) {
            if (distances[i][1] == "Oui") nbrOui++;
            else nbrNon++;
        }
        if (nbrOui > nbrNon) console.log("REsultat = Oui"); else console.log("Resultat = Non");
        readline.close();
    });
}
