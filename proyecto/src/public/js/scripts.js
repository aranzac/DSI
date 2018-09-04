
    function enviar_seleccion(sel){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
      var i = sel;
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            funcion_memento(myObj);
            document.getElementById("dia").innerHTML = myObj[i].dia;
            document.getElementById("primero").innerHTML = myObj[i].primero;
            document.getElementById("segundo-plato").innerHTML = myObj[i].segundo[0].plato;
            document.getElementById("segundo-guarnicion").innerHTML = myObj[i].segundo[0].guarnicion;
        }
    };
    xmlhttp.open("GET", "js/json_demo.json", true);
    xmlhttp.send();
    }


    function copy_on_click() {
      var copyText = document.getElementById("telef");
      copyText.select();
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
    }


  $(document).ready(function(){
    $('select').formSelect();
  });


  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function menu_toggle() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// EXPRESIONES REGULARES
  function comprobar_nombre() {
        var str = document.getElementById("nombre");
        var patt = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$");

        if (patt.test(str.value)){
          str.setCustomValidity('');
        }
        else{
          str.setCustomValidity("El nombre no es válido. Introduce solo letras y espacios en blanco.");
        }
    }

  function comprobar_apellido() {
      var str = document.getElementById("apellido");
      var patt = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$");

      if (patt.test(str.value)){
        str.setCustomValidity('');
      }
      else{
        str.setCustomValidity("El apellido no es válido. Introduce solo letras y espacios en blanco.");
      }
  }

  function comprobar_dni() {
    var str = document.getElementById("dni");
    var dni = str.value;
    var numero, letrilla, letra;
    var expresion_regular_dni = new RegExp("^[XYZ]?\d{5,8}[A-Z]$");
    dni = dni.toUpperCase();

    numero = dni.substr(0,dni.length-1);
    numero = numero.replace('X', 0);
    numero = numero.replace('Y', 1);
    numero = numero.replace('Z', 2);
    letrilla = dni.substr(dni.length-1, 1);
    numero = numero % 23;
    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letra = letra.substring(numero, numero+1);
    if(letra == letrilla){
      if(!expresion_regular_dni.test(str.value.toUpperCase())){
        str.setCustomValidity('');
      }
    }
    else{
      str.setCustomValidity("El DNI no es válido.");
    }
  }

  function comprobar_correo() {
    var str = document.getElementById("mail");
    var patt = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

    if (patt.test(str.value)){
      str.setCustomValidity('');
    }
    else{
      str.setCustomValidity("El correo electrónico no es válido. Incluye el signo @ y texto tras él");
    }
  }

  function comprobar_contrasena(){
    var str = document.getElementById("password");
    var patt = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

    if (patt.test(str.value)){
      str.setCustomValidity('');
    }
    else{
      str.setCustomValidity("La contraseña no es lo suficientemente fuerte. Introduce al menos 6 carácteres incluyendo al menos una minúscula, una mayúscula, un número y un carácter especial.");
    }
  }

        // PATRONES DE DISEÑO

// Patron: Decorator

var msj = "";
function mensaje(value, msg){
  if (value == "sumar") msj += msg + "\n";
  else if(value == "mostrar"){
      alert(msj);
      msj = "";
    }
}

function Credencial(nombre, apellido, nota){
    this.nombrePersona = nombre || "Anónimo";
    this.apellidoPersona = apellido || " ";
    this.nota = nota || "0";

    this.mostrar = function(){
        mensaje("sumar", "Bienvenido/a " + this.nombrePersona + " " + this.apellidoPersona + "!");
    };
}

function aprobar(nota){
  if(nota >= 5) return "aprobar!";
  else return "suspender.";
}

function Decorador1(credencialD1){
  this.curso = aprobar(credencialD1.media);
  this.mostrar = function(){
    mensaje("sumar", "Este año vas a " +  this.curso);
  };
}

// Esta no funcionaba
// function Decorador1(credencial){
  // this.media = (credencial.nota + 10);
//   this.mostrar = function(){
//     mensaje("sumar", "Tu nota media es " +  this.media);
//   };
// }

function run(nombre, apellido, nota){
  var instanciaCredencial = new Credencial(nombre, apellido, nota);
  instanciaCredencial.mostrar();

  var instanciaDec1 = new Decorador1(instanciaCredencial);
  instanciaDec1.mostrar();

  mensaje("mostrar","");
}

/////////////////////////////////////////////////////////////////////////////
// Patrón: Memento

var Menu = function(objeto){
  this.dia = objeto.dia;
  this.primero = objeto.primero;
  this.segundo = objeto.segundo[0].plato;
}

Menu.prototype = {
  convertirJ: function(){
    var memoria = JSON.stringify(this);
    return memoria;
  },
  convertirO: function(memoria){
    var v = JSON.parse(memoria);
    this.dia = v.dia;
    this.primero = v.primero;
    this.segundo = v.segundo;
  }
}

var Registro = function() {
  this.memorias = {};

  // memoria seria el objeto
  this.agregar = function(inx, memoria){
    this.memorias[inx] = memoria;
  }
  this.retorna = function(inx){
    return this.memorias[inx];
  }
}


function funcion_memento(objeto){  // Cliente
  var x = document.getElementById("selector").value;

  var menuHoy = new Menu(objeto[x]);
  var registro = new Registro();
  var i = 0;

  // Agregamos el json a la memoria
  registro.agregar(i, menuHoy.convertirJ());

  // Cambiamos un valor del objeto principal y mostramos
  menuHoy.primero = "Ensalada de pasta";
  menuHoy.segundo = "Filete de pescado";

  // Para ver el menu cambiado (Nota: hay que comentar convertirO)
  // console.log(menuHoy);

  // Para ver el registro
  // console.log(registro.retorna(i));

  // Restauramos el valor incial del objeto
  menuHoy.convertirO(registro.retorna(i));

  alert("El menú para el día " + menuHoy.dia + " es " + menuHoy.primero + " y " + menuHoy.segundo);
  console.log(menuHoy);
}

//////////////////////////////////////////////////////////////////////////////////
// Patrón: Singleton

var Singleton = (function () {
    var instancia;

    function crearInstancia() {
        var mensaje = new Object("Vas a cambiar de página");
        return mensaje;
    }

    return {
        getInstancia: function () {
            if (!instancia) {
                instancia = crearInstancia();
            }
            return instancia;
        }
    };
})();

function funSingleton() {

    var instancia1 = Singleton.getInstancia();
    var instancia2 = Singleton.getInstancia();

    if(instancia1 === instancia2)
      console.log("Las instancias son iguales");
}
