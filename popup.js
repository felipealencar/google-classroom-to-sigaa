/* eslint-disable no-undef */
var students;
const popup = document.getElementById('csv-reader-popup');

const CSV_SOBRENOME = 0;
const CSV_NOME = 1;
const CSV_EMAIL = 2;
const CSV_AV1 = 3;
const CSV_AV2 = 4;
const CSV_AV3 = 5;
const CSV_AV4 = 6;
const CSV_REC1 = 7;
const CSV_AV5 = 8;
const CSV_AV6 = 9;
const CSV_AV7 = 10;
const CSV_AV8 = 11;
const CSV_REC2 = 12;
const CSV_REC_FINAL = 13;
const NOME_AVALIACAO = "Avaliação";
const NOME_RECUPERACAO = "Recuperação";

var query = { active: true, currentWindow: true };

window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

function inputFileOnChange(event) {
    var inputFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        students = csvToArray(e.target.result);
        console.log(students);
    };
  
    reader.readAsText(inputFile);
}

function avoidNaN(data){
    if(isNaN(parseFloat(data))){
        return 0;
    }
    return parseFloat(data);
}

function getMedia(nota1, nota2){
    nota1 = avoidNaN(nota1);
    nota2 = avoidNaN(nota2);
    return (nota1+nota2)/2;
}

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            header = header.trim();
            object[header] = values[index];
            // ajuste no ordenamento do csv padrão do Classroom
            switch (header){
                case 'Nome':
                    object[header] = values[index] + ' ' + values[index-1];
                case NOME_AVALIACAO + ' 2':
                    object["1"] = getMedia(values[CSV_AV1], values[CSV_AV2]);
                case NOME_AVALIACAO + ' 4':
                    object["2"] = getMedia(values[CSV_AV3], values[CSV_AV4]);
                case NOME_RECUPERACAO + ' 1':
                    object["R1"] = values[CSV_REC1];
                case NOME_AVALIACAO + ' 6':
                    object["3"] = getMedia(values[CSV_AV5], values[CSV_AV6]);
                case NOME_AVALIACAO + ' 8':
                    object["4"] = getMedia(values[CSV_AV7], values[CSV_AV8]);
                case NOME_RECUPERACAO + ' 2':
                    object["R2"] = values[CSV_REC2];
                case NOME_RECUPERACAO + ' Final':
                    object["FINAL"] = values[CSV_REC_FINAL];
            }
            return object;
        }, {});
        return el;
    });
    indexToRemove = 0;
    numberToRemove = 2; //remove as duas primeiras linhas do vetor
    arr.splice(indexToRemove, numberToRemove);
    // return the array
    return arr;
  }

function normalizeName(){
    return students.map(row => {return row["Nome"] + ' ' + row["Sobrenome"]});
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await browser.tabs.query(queryOptions);
    return tab;
}

function convert(event){
    getCurrentTab().then(tab => 
        browser.tabs.sendMessage(tab.id, {greeting: "hello", data: students}, function(response) {
            response = response || {};
            console.log('onResponse', response.farewell);
        })
    );
}

popup.querySelector("#csv-file").addEventListener('change', inputFileOnChange);
popup.querySelector("#convert").addEventListener('click', convert);
