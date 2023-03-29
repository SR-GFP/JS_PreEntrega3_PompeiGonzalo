//----------VINCULACION DE NODOS-----------////
/*  Function abstracta para vinvulacion de nodos
    Solo se deben agregar al array los nombres de las variables a vincular con los Nodos
    Nota: las variables y los nodos deben tener el mismo nombre de ID*/

const listaDeVariablesParaNodos = [
    btnLogin,
    ventanaEmergente,
    inputUsuario,
    inputPassword,
    inputIngresar,
    btnCerrar,
]
const vincularNodos =(array) => {    
        let i = document.querySelector("#i")    
}
listaDeVariablesParaNodos.forEach(vincularNodos)

/*Log in*/
btnLogin.onclick = function() {
    ventanaEmergente.className = "ver";
}

btnCerrar.onclick = function (){
    ventanaEmergente.style.display = "none";
}
