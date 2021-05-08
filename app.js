// KPPV algorithm using hamming method
// Author: Mendja Wadie

const fs = require('fs');
// reading databse.json file
fs.readFile('./database.json', (err, databaseContent) => {
    const json = JSON.parse(databaseContent.toString());
    const data = json.data;
    showData(data);
});


// affichage
function showData(data) {
    console.log(data);
    console.log("  ---------------------------------------------------------  ");
    console.log("    id    |    Backend    |    ForntEnd    |    FullStack    ");
    console.log("  ---------------------------------------------------------  ");
    for (let i = 0; i < data.length; i++) {
        const L = data[i];
        const spaces = data[i].backend == "Fable" ? "   " : data[i].backend == "Moyenne" ? " " : "";
        const spaces2 = data[i].frontend == "Fable" ? "   " : data[i].frontend == "Moyenne" ? " " : "";
        console.log("     " + L.id + "         " + L.backend + "        " + spaces + L.frontend + "         " + spaces2 + L.fullstack + "    ");
    }
}

// 
