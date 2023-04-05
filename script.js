//---- VARIABLES-----//
let stock = [];
let productosVenta = [];
let carrito = [];

//-- Clase constructora para stock--//
class NuevoProducto {
  constructor(id, nombre, modelo, color, talle, cantidadStock, rutaImg) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.modelo = modelo.toUpperCase();
    this.color = color.toUpperCase();
    this.talle = talle;
    this.cantidadStock = cantidadStock;
    this.rutaImg = rutaImg;
  }
}


//----------VINCULACION DE NODOS POR ID-----------//

const listaDeVariablesParaNodos = [
  // Variables para login y vistas
  btnLogin,
  ventanaEmergente,
  inputUsuario,
  inputPassword,
  btnIngresar,
  contenedorForm,
  btnCerrarLogin,
  formularioDeIngreso,
  contenedorHome,
  contenedorAdministrador,
  contenedorCarrito,
  //Variables de vista Administrador//
  btnAgregarProductoStock,
  vistaAgregarProducto,
  inputID,
  inputColor,
  inputNombre,
  inputModelo,
  inputTalle,
  inputCantidadStock,
  btnCargarProducto,
  btnCerrarForm,
  inputArchivo,
  formularioAgregarProducto,
]
// Función para vincular variables a nodos correspondientes en el DOM
function vincularNodos() {
  for (let i = 0; i < listaDeVariablesParaNodos.length; i++) {
    let variable = listaDeVariablesParaNodos[i];
    let nodo = document.getElementById(variable.id);
    if (nodo) {
      variable.nodo = nodo;
    }
  }
}




/*  Function abstracta para vinvulacion de nodos
    Se agregan al array los nombres de las variables a vincular con los Nodos
    Nota: las variables y los nodos deben tener el mismo nombre de ID*/
/* const vincularNodos = (array) => {
    let i = document.querySelector("#i")
}
listaDeVariablesParaNodos.forEach(vincularNodos)*/



//-- FUNCION PARA INICIALIZAR LOS EVENTOS--//
function inicializarEventos() {
  formularioDeIngreso.onsubmit = (event) => validarIngreso(event);
  btnCerrarLogin.onclick = (event) => cerrarLogin(event);
  btnAgregarProductoStock.onclick = verFormularioAgregarProducto;
  formularioAgregarProducto.onsubmit = (event) => validarFormularioAgregarProducto(event);
  btnCerrarForm.onclick = cerrarForm;

}


/*-------------Log in ------------*/
btnLogin.onclick = function () {
  ventanaEmergente.className = "ventana__emergente__desbloqueada";
}

function cargarDatosAdministradorStorage() {
  localStorage.setItem("UsuarioAdmin", "Admin");
  localStorage.setItem("PasswordAdmin", "898989");
}
function obtenerDatosAdministradorStorage() {
  usuarioAdmin = localStorage.getItem("UsuarioAdmin");
  passwordAdmin = localStorage.getItem("PasswordAdmin");
}
function cerrarLogin(event) {
  event.preventDefault();
  formularioDeIngreso.reset();
  ventanaEmergente.className = "ventana__emergente__bloqueada"
}

function validarIngreso(event) {
  event.preventDefault();
  usuario = inputUsuario.value;
  password = inputPassword.value;
  obtenerDatosAdministradorStorage();

  if (usuario === usuarioAdmin && password === passwordAdmin) {
    contenedorHome.hidden = true;
    contenedorCarrito.hidden = true;
    Swal.fire({
      icon: 'success',
      text: 'Usted Ingreso como Administrador',
    })
    contenedorAdministrador.hidden = false;
  } else {
    contenedorHome.hidden = true;
    contenedorAdministrador.hidden = true;
    Swal.fire({
      icon: 'success',
      text: "Hola " + usuario,
    })
    contenedorCarrito.hidden = false;
  }
  formularioDeIngreso.reset();
  ventanaEmergente.className = "ventana__emergente__bloqueada";
}
function cerrarForm(event) {
  event.preventDefault();
  formularioAgregarProducto.reset();
  vistaAgregarProducto.hidden = true;
}
function verFormularioAgregarProducto(event) {
  vistaAgregarProducto.hidden = false;
}

// validar Formulario para nuevo Producto
function validarFormularioAgregarProducto(event) {
  event.preventDefault();
  let idProducto = inputID.value;
  let nombreProducto = inputNombre.value;
  let colorProducto = inputColor.value;
  let modeloProducto = inputModelo.value;
  let talleProducto = inputTalle.value;
  let cantidadStockProducto = inputCantidadStock.value;
  let rutaArchivo = inputArchivo.value;

  // validar si el producto existe, si no cargarlo con class
  const idExiste = stock.some((producto) => producto.id === idProducto);
  if (!idExiste) {
    let producto = new NuevoProducto(
      idProducto,
      nombreProducto,
      colorProducto,
      modeloProducto,
      talleProducto,
      cantidadStockProducto,
      rutaArchivo,
    );
    stock.push(producto)
    console.log(stock)
    Swal.fire("Se agrego el producto correctamente")    
    pintarNuevoProducto();
    formularioAgregarProducto.reset();
  } else {
    Swal.fire("El ID de producto ya existe!")
  }
}

//funcion para pintar solamente el Producto que se esta agregando a stock//
function pintarNuevoProducto() {
  contenedorNuevoProducto.innerHTML = "";
  let column = document.createElement("div");
  column.className = "col-md-12";
  column.id = `columna-${inputID.value}`;
  column.innerHTML = `
    <div class="card mb-3 ml-1" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="./img/${inputModelo.value}.jpg"
                alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <p class="card-text">ID: ${inputID.value} </p>
                <p class="card-text">Color: ${inputColor.value} </p>
                <p class="card-text">Nombre: ${inputNombre.value}</p>
                <p class="card-text">Modelo: ${inputModelo.value}</p>
                <p class="card-text">Talle: ${inputTalle.value}</p>
                <p class="card-text">Cantidad: ${inputCantidadStock.value}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-dark" id="botonModificar-">Modificar</button>            
              <button class="btn btn-outline-danger" id="botonEliminar">Eliminar</button>
        </div>
    </div>
    `;
  contenedorNuevoProducto.append(column);
}

function main() {
  vincularNodos();
  cargarDatosAdministradorStorage();
  inicializarEventos();
}

main()

