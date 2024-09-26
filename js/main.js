let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productos = [
    { 
        id: "P001",
        clase: "Pokemon",
        nombre: "pikachu", 
        precio: 1000, 
        stock: 3,
        img: "./img/pokemon/pikachu-1.webp",
        cuotas: 3,
    },
    { 
        id: "S002",
        clase: "Star Wars",
        nombre: "stormtrooper", 
        precio: 2000, 
        stock: 3,
        img: "./img/star-wars/trooper-1.webp",
        cuotas: 3,
    },
    { 
        id: "H003",
        clase: "Harry Potter",
        nombre: "harry potter", 
        precio: 3000, 
        stock: 3,
        img: "./img/harry-potter/harry-1.webp",
        cuotas: 3,
    },
    { 
        id: "P004",
        clase: "Pokemon",
        nombre: "Pidgeotto Flying", 
        precio: 1500, 
        stock: 3,
        img: "./img/pokemon/pidgeotto-1.webp",
        cuotas: 3,
    },
    { 
        id: "S005",
        clase: "Star Wars",
        nombre: "Luke Skywalker", 
        precio: 2500, 
        stock: 3,
        img: "./img/star-wars/luke-1.webp",
        cuotas: 3,
    },
    { 
        id: "H006",
        clase: "Harry Potter",
        nombre: "Hermione Ball Dress", 
        precio: 3500, 
        stock: 3,
        img: "./img/harry-potter/hermione-1.webp",
        cuotas: 3,
    },
    { 
        id: "P007",
        clase: "Pokemon",
        nombre: "Charmander Smiley", 
        precio: 1000, 
        stock: 3,
        img: "./img/pokemon/charmander-1.webp",
        cuotas: 3,
    },
    { 
        id: "S008",
        clase: "Star Wars",
        nombre: "Baby Yoda Blueball", 
        precio: 2000, 
        stock: 3,
        img: "./img/star-wars/baby-yoda-1.webp",
        cuotas: 3,
    },
    { 
        id: "H009",
        clase: "Harry Potter",
        nombre: "Luna Lovegood Lion Mask", 
        precio: 3000, 
        stock: 3,
        img: "./img/harry-potter/luna-1.webp",
        cuotas: 3,
    },
]

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos");
const carritoTotal = document.querySelector("#carritoTotal");

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("cardFunkos");
    div.innerHTML = `
        <img src=${producto.img}>
        <h2>${producto.nombre}</h2>
        <h3 class="productShop">${producto.clase}</h3>
        <h3>$ ${producto.precio}</h3>
        <h3 class="promoShop">${producto.cuotas} CUOTAS SIN INTERES</h3>
    `; 

    let button = document.createElement("button");
    button.classList.add("btn", "btn-light", "botonComprar");
    button.innerText = "COMPRAR";

    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);

    contenedorProductos.append(div);
});

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $ ${producto.precio * producto.cantidad}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("carritoBoton");
            button.innerText = "Eliminar";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
}

function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);

    actualizarCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `El total de su compra es:  $ ${total}`;
} 

actualizarCarrito();












