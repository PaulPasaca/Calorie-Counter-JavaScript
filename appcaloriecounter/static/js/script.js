
const contadorCalorias = document.getElementById('contador-calorias');
const in_Estimacion = document.getElementById('estimacion');
const entradaDesplegable = document.getElementById('entrada-desplegable');
const btn_añadirEntrada = document.getElementById('añadir-entrada');
const btn_limpiar = document.getElementById('limpiar');
const salida = document.getElementById('salida');
let isError = false;


function cleanInputString(str) {

  /* const strArray = str.split('');
   const cleanStrArray = [];
  // revisa si no existe + - o espacio e ingresa el valor actual en el nuevo 
  // arreglo si se cumple la condicion
   for (let i = 0; i < strArray.length; i++) {
     if (!["+", "-", " "].includes(strArray[i])) {
       cleanStrArray.push(strArray[i])
     }
   }
   */
  // hace lo mismo que el metodo anterior pero en menos lineas;  \ se usa para escapar 
  //porque + tiene un significado de las expresiones regulares 
  // const regex = /\+-\s/; 

  //  Ya no es necesario \ en el + porque se esta usando una clase de caracteres 
  // La bandera g, que significa "global", le dirá al patrón que continúe buscando 
  //después de haber encontrado una coincidencia. 
  const regex = /[+-\s]/g;
  /* Las cadenas tienen un método .replace() que permite sustituir caracteres de la cadena 
  por otra cadena. Recibe dos argumentos. El primero es la secuencia de caracteres a reemplazar 
  puede ser una cadena o un patrón regex. El segundo es la cadena por la que se sustituirá 
  la secuencia. */
  return str.replace(regex, "")
  //i = "insensible".  Este indicador hace que el patrón no distinga entre mayúsculas y minúsculas.


}
//**********************EVITA QUE EN EL INPUT SE AGREGE VALORES EXPONENVIALES  ejemplo = 1e10  */
function isInvalidInput(str) {
  /*El modificador + en una expresión regular le permite hacer coincidir un patrón que 
  aparece una o más veces. */
  //const regex = /[0-9]+e[0-9]+/i;

  //Hay una clase de caracteres abreviada para que coincida con cualquier dígito: \d.
  const regex = /\d+e\d+/i;
  /*método .match(), que recibe un argumento regex. .match() devuelve una matriz de resultados que 
  contiene la primera coincidencia o todas las coincidencias si se utiliza el indicador global.*/
  return str.match(regex);

}

//++++++++++Permitir a los usuarios añadir entradas al contador de calorías.++++++++++
function añadirEntrada() {
  // Puedes utilizar la propiedad value para obtener el valor de la opción seleccionada.
  //const targetId = '#' + entryDropdown.value;
  //Ahora necesitas apuntar al elemento .input-container dentro del elemento que tiene tu targetId
  //const targetInputContainer = document.querySelector(targetId + ' .input-container')

  /** 
   * función denominada literales de plantilla, que permite interpolar variables directamente 
   * dentro de una cadena. Los literales de plantilla se indican con comillas ``, 
   * en lugar de comillas simples o dobles. Las variables pueden introducirse 
   * en un literal de plantilla rodeando la variable con ${}: el valor de la variable 
   * se insertará en la cadena.

  */

  const targetInputContainer = document.querySelector(`#${entradaDesplegable.value} .input-container`);
  /**El método querySelectorAll() devuelve un NodeList de todos los elementos que coinciden con 
   * el selector. Un NodeList es un objeto similar a un array, por lo que puede acceder a los
   *  elementos utilizando la notación de corchetes.
 */
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  // Declara una nueva variable HTMLString, y asígnale una cadena literal de plantilla vacía.
  const HTMLString = `
  <label for="${entradaDesplegable.value}-${entryNumber}-name">Entrada ${entryNumber} Nombre</label>
  <input type="text" id="${entradaDesplegable.value}-${entryNumber}-name" placeholder="Nombre" />
  <label for="${entradaDesplegable.value}-${entryNumber}-calories">Entrada ${entryNumber} Calorias</label>
  <input type="number" min="0" id="${entradaDesplegable.value}-${entryNumber}-calories" placeholder="Calorias"/>
  
  `;
  //La propiedad innerHTML establece o devuelve el contenido HTML dentro de un elemento.
  //  targetInputContainer.innerHTML += HTMLString
  /**
   * SE MODIFICA PARA QUE NO SE BORRE LOS NUEVOS LITERALES AÑADIDOS 
   * El método insertAdjacentHtml toma dos argumentos. El primer argumento es una cadena que 
   * especifica la posición del elemento insertado. El segundo argumento es una cadena que 
   * contiene el HTML que se va a insertar.
  
   */
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);


}
/**
 * El evento submit se activa cuando el formulario es enviado. La acción por defecto 
 * del evento submit es recargar la página. Necesitas prevenir esta acción por 
 * defecto usando el método preventDefault() de tu parámetro e.
 * 
 */
function calcularCalorias(e) {

  e.preventDefault();
  isError = false;

  const in_desayunoNum = document.querySelectorAll('#desayuno input[type=number]');
  const in_almuerzoNum = document.querySelectorAll('#almuerzo input[type=number]');
  const in_cenaNum = document.querySelectorAll('#cena input[type=number]');
  const in_snacksNum = document.querySelectorAll('#snacks input[type=number]');
  const in_ejercicioNum = document.querySelectorAll('#ejercicio input[type=number]');

  const caloriasDesayuno = obtenerCaloriasInputs(in_desayunoNum);
  const caloriasAlmuerzo = obtenerCaloriasInputs(in_almuerzoNum);
  const caloriasCena = obtenerCaloriasInputs(in_cenaNum);
  const caloriasSnacks = obtenerCaloriasInputs(in_snacksNum);
  const caloriasEjercicio = obtenerCaloriasInputs(in_ejercicioNum);
  const caloriasEstimacion = obtenerCaloriasInputs([in_Estimacion]);

  if (isError) {
    return;
  }

  const caloriasConsumidas = caloriasDesayuno + caloriasAlmuerzo + caloriasCena + caloriasSnacks;
  const caloríasRestantes = caloriasEstimacion - caloriasConsumidas + caloriasEjercicio;
  const surplusOrDeficit = caloríasRestantes < 0 ? 'Surplus' : 'Deficit';
  //Math.abs DEVUELVE UN VALOR ABSOLUTO 
  salida.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(caloríasRestantes)} Calorias ${surplusOrDeficit}</span>
  <hr>
  <p>${caloriasEstimacion} Calorias Estimadas</p>
  <p>${caloriasConsumidas} Calorias Consumidas</p>
  <p>${caloriasEjercicio} Calorías Quemadas</p>
  `;

  salida.classList.remove('hide');
}
/**
 * Función que obtenga el recuento de calorías de las 
 * entradas del usuario.

 */
function obtenerCaloriasInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      // AQUI UN EJEMPLO DE PLANTILLA LITERAL O template literal, 
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      /**
     * El constructor Number es una función que convierte un valor en un número. 
     * Si el valor no se puede convertir, devuelve NaN, que significa "Not a Number" 
     * (no es un número).

     */
    }
    calories += Number(currVal);
  }
  return calories;
}



function limpiarFormulario() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    // recorre todo el arreglo de los inputs y los borra
    container.innerHTML = '';

  }
  // limpia el budgetNumberInput
  in_Estimacion.value = '';
  /**
   * La diferencia entre innerText e innerHTML es que innerText no renderizará los elementos
   *  HTML, sino que mostrará las etiquetas y el contenido como texto sin formato.
   */
  salida.innerText = '';
  /**
   *Restaurar la clase hide al elemento de salida.La propiedad classList tiene un método .add() 
   que es el opuesto al método .remove().Acepta una cadena que representa la clase a añadir al 
   elemento.

   */
  salida.classList.add('hide');

}

btn_añadirEntrada.addEventListener("click", añadirEntrada);
contadorCalorias.addEventListener("submit", calcularCalorias);
btn_limpiar.addEventListener("click", limpiarFormulario);
