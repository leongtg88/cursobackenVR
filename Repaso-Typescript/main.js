//Definir una variable en typescript
console.log("Script Cargado");
var mi_variable = "VICTOR ROBLES WEB";
var numero = 12;
var verdadero = true;
var cualquier = "puedo meter lo que sea";
verdadero = false;
//Constantes
var nombre = "Leon";
console.log(TextDecoder, numero, verdadero);
//Arrays
var personas = ["Leon", "Maria", "Ale"];
var div_personas = document.querySelector("#personas");
div_personas.innerHTML = "<ul>";
personas.map(function (persona) {
    return "<li>".concat(persona, "+</li>");
}).join("");
+"</ul>";
