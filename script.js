// Arreglo con los productos disponibles en la tienda
const productos = [
    {
        id: 1,
        nombre: 'Funda Smartphone Compostable',
        precio: 19990,
        imagen: 'images/funda.jpg',
        descripcion: 'Funda para smartphone compostable y biodegradable'
    },
    {
        id: 2,
        nombre: 'Cargador Solar Portátil',
        precio: 39990,
        imagen: 'images/powerbank_solar.png',
        descripcion: 'Cargador portátil solar 22.5W'
    },
    {
        id: 3,
        nombre: 'Audífonos Ecologicos',
        precio: 59990,
        imagen: 'images/audifonos.jpg',
        descripcion: 'Audífonos cómodos fabricados con plástico rescatado del océano .'
    },
    {
        id: 4,
        nombre: 'Mouse hecho a base de bambú',
        precio: 39990,
        imagen: 'images/mouse.jpg',
        descripcion: 'Mouse ecologico hecho de bambú.'
    },
    {
        id: 5,
        nombre: 'Teclado hecho a base de bambú',
        precio: 49990,
        imagen: 'images/teclado.jpg',
        descripcion: 'Mouse ecologico hecho de bambú.'
    },
    {
        id: 6,
        nombre: 'Taza térmica',
        precio: 11990,
        imagen: 'images/Taza.png',
        descripcion: 'Taza con tapa electronica para conservar la temperatura.'
    }
];

let cantidadCarrito = Number(localStorage.getItem('cantidadCarrito')) || 0;

function crearTarjeta(producto) {
    return `
        <article class="tarjeta-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">Precio: $${producto.precio.toLocaleString('es-CL')}</p>
            <button type="button" class="boton-agregar" data-id="${producto.id}">Añadir al carrito</button>
        </article>
    `;
}

function mostrarDestacados() {
    const contenedor = document.getElementById('productosDestacados');

    if (contenedor) {
        contenedor.innerHTML = productos.slice(0, 3).map(crearTarjeta).join('');
    }
}

function mostrarProductos() {
    const contenedor = document.getElementById('listaProductos');

    if (contenedor) {
        contenedor.innerHTML = productos.map(crearTarjeta).join('');
    }
}

function actualizarCarrito() {
    const indicadores = document.querySelectorAll('.cantidad-carrito');
    const totalCarrito = document.getElementById('totalCarrito');

    indicadores.forEach((indicador) => {
        indicador.textContent = cantidadCarrito;
    });

    if (totalCarrito) {
        totalCarrito.textContent = cantidadCarrito;
    }

    localStorage.setItem('cantidadCarrito', cantidadCarrito);
}

document.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('boton-agregar')) {
        cantidadCarrito++;
        actualizarCarrito();
        evento.target.textContent = 'Agregado';

        setTimeout(() => {
            evento.target.textContent = 'Añadir al carrito';
        }, 1000);
    }
});

function prepararBotonVaciar() {
    const botonVaciar = document.getElementById('vaciarCarrito');

    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            cantidadCarrito = 0;
            actualizarCarrito();
        });
    }
}

function prepararFormulario() {
    const form = document.getElementById('formContacto');

    if (!form) {
        return;
    }

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const motivo = document.getElementById('motivo');
    const mensaje = document.getElementById('mensaje');
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorMotivo = document.getElementById('errorMotivo');
    const errorMensaje = document.getElementById('errorMensaje');
    const contadorMensaje = document.getElementById('contadorMensaje');
    const mensajeExito = document.getElementById('mensajeExito');

    function validarNombre() {
        if (nombre.value.trim() === '') {
            errorNombre.textContent = 'El nombre completo es obligatorio.';
            return false;
        }

        errorNombre.textContent = '';
        return true;
    }

    function validarEmail() {
        const correo = email.value.trim().toLowerCase();
        const formatoPermitido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (correo === '') {
            errorEmail.textContent = 'El correo electrónico es obligatorio.';
            return false;
        }

        if (!formatoPermitido.test(correo)) {
            errorEmail.textContent = 'Utilice un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            return false;
        }

        errorEmail.textContent = '';
        return true;
    }

    function validarMotivo() {
        if (motivo.value === '') {
            errorMotivo.textContent = 'Seleccione un motivo de contacto.';
            return false;
        }

        errorMotivo.textContent = '';
        return true;
    }

    function validarMensaje() {
        if (mensaje.value.trim() === '') {
            errorMensaje.textContent = 'El mensaje es obligatorio.';
            return false;
        }

        errorMensaje.textContent = '';
        return true;
    }

    nombre.addEventListener('input', validarNombre);
    email.addEventListener('input', validarEmail);
    motivo.addEventListener('change', validarMotivo);
    mensaje.addEventListener('input', () => {
        contadorMensaje.textContent = mensaje.value.length;
        validarMensaje();
    });

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        mensajeExito.textContent = '';

        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const motivoValido = validarMotivo();
        const mensajeValido = validarMensaje();

        if (nombreValido && emailValido && motivoValido && mensajeValido) {
            mensajeExito.textContent = 'Mensaje enviado correctamente.';
            form.reset();
            contadorMensaje.textContent = '0';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarDestacados();
    mostrarProductos();
    actualizarCarrito();
    prepararBotonVaciar();
    prepararFormulario();
});
