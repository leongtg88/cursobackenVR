//Definir una variable en typescript
console.log("Script Cargado");


let mi_variable:string = "VICTOR ROBLES WEB";
let numero:number = 12;
let verdadero: boolean = true;
let cualquier:any = "puedo meter lo que sea";
verdadero =  false;

//Constantes
const nombre:string = "Leon";

console.log(TextDecoder, numero, verdadero);

//Arrays
let personas:string[] = ["Leon", "Maria", "Ale"];

let div_personas:HTMLElement | null = document.querySelector("#personas");

div_personas.innerHTML= "<ul>"  

        personas.map((persona) => {
            return `<li>${persona}+</li>`;
}).join("");

 + "</ul>";