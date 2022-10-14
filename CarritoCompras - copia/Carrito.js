// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Túnel Elíptico',
        precio: 1,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO1.jpg?alt=media&token=3ff4fbda-2840-48ef-9adc-4b396c7a5132',
        descripcion: 'Arquitectura moderna en blanco y negro , Madrid'
    },
    {
        id: 2,
        nombre: 'Torre',
        precio: 2,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO2.jpg?alt=media&token=fab215f9-dbf0-4628-814c-348f55955cf4',
        descripcion: 'Arquitectura moderna de Hong Kong blanco y negro'
    },
    {
        id: 3,
        nombre: 'Torre Esférica',
        precio: 3,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO3.jpg?alt=media&token=b9704f54-f306-4522-9f9d-6150e2823f9a',
        descripcion: 'Arquitectura moderna en blanco y negro'
    },
    {
        id: 4,
        nombre: 'Reflexión',
        precio: 4,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO4.jpg?alt=media&token=3ef65854-c3ab-48ac-b9a6-ff65e3c1424e',
        descripcion: 'Línea, reflexión, sombra'
    },
    {
        id: 5,
        nombre: 'Cubos',
        precio: 5,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO5.webp?alt=media&token=0aec1c41-548f-4391-aff7-9310f805cea5',
        descripcion: 'Arquitectura moderna en blanco y negro'
    },
    {
        id: 6,
        nombre: 'Seúl',
        precio: 6,
        imagen: 'https://firebasestorage.googleapis.com/v0/b/carrito-de-compras-2d150.appspot.com/o/FOTO6.jpg?alt=media&token=5dd04f3e-16c4-40e6-9684-4e05fe0b2b01',
        descripcion: 'Arquitectura moderna en blanco y negro , Seul'
    }

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const totalCompra = document.createElement('p')
let subtotal = 0
let hola = 1
// Funciones

//Dibuja todos los productos a partir de la base de datos. No confundir con el carrito/

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('col');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add("card", "shadow", "text-center", "h-100", "pb-md-3", "p-5");
        // Titulo
        const miNodoTitle = document.createElement('h3');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid', 'w-100', 'h-100');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('h5');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        // Descripcion
        const miNodoDescripcion = document.createElement('h6');
        miNodoDescripcion.classList.add('card-text');
        miNodoDescripcion.textContent = info.descripcion;
        // Boton 
        const miNodoBoton = document.createElement('botonAgregarCarrito');
        miNodoBoton.classList.add('btn', 'bg-secondary', 'text-white', 'text-bold')
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoDescripcion);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

//Evento para añadir un producto al carrito de la compra/

function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();
}

//Evento para borrar un elemento del carrito/

const disminuir = document.createElement('button')
disminuir.classList.add('btn', 'btn-info', 'mx-5');
disminuir.textContent = 'Vaciar Carrito';
disminuir.addEventListener('click', vaciarCarrito)

/* Dibuja todos los productos guardados en el carrito*/
function renderizarCarrito(info) {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);



        // Creamos el nodo del item del carrito
        const imama = document.createElement('img')
        imama.classList.add('img-fluid', 'w-25')
        // imama.style = 'width'
        imama.src = miItem[0].imagen
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${miItem[0].nombre}-${numeroUnidadesItem} x ${divisa}${miItem[0].precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-secundary', 'mx-5');
        miBoton.textContent = 'Eliminar producto';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito2);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(disminuir)
        DOMcarrito.appendChild(imama)
        DOMcarrito.appendChild(miNodo);
        DOMcarrito.appendChild(totalCompra);
        DOMcarrito.appendChild(disminuir)




    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}



function borrarItemCarrito2(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return (
            carritoId !== id)
    });

    // volvemos a renderizar
    renderizarCarrito();
}


function borrarItemCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total -= 1;
            }, 0);
            // Creamos el nodo del item del carrito
            const imama = document.createElement('img')
            imama.classList.add('img-fluid', 'w-25')
            // imama.style = 'width'            
            imama.src = miItem[0].imagen
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            // miNodo.textContent = `${miItem[0].nombre}-${numeroUnidadesItem} x ${divisa}${miItem[0].precio}`;   
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-secondary', 'mx-5');
            miBoton.textContent = 'Eliminar producto';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.textContent = `${miItem[0].nombre}-${(numeroUnidadesItem )} x ${divisa}${miItem[0].precio}`;           
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(disminuir)
            DOMcarrito.appendChild(imama)
            DOMcarrito.appendChild(miNodo);
            DOMcarrito.appendChild(totalCompra);
            DOMcarrito.appendChild(disminuir)
        });

        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();    
}

//Calcula el precio total teniendo en cuenta los productos repetidos/

function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return totalCompra.textContent = parseInt(item) + parseInt(total)
    }, 0).toFixed(2);
}

//Varia el carrito y vuelve a dibujarlo/

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    swal({
        title: "Carrito Vacío!",
        text: "Realiza una Compra!",
        icon: "success",
        button: "Aceptar!",
    });
    // Renderizamos los cambios
    renderizarCarrito();
}
// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
// Inicio
renderizarProductos();
renderizarCarrito();



