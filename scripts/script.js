// Agrego array de objetos con datos que vamos a utilizar
const PRODUCTS = [
  {
    id: 'product1',
    name: 'CR90 corvette',
    manufacturer:
      'Corellian Engineering Corporation',
    cost_in_credits: 350,
    image: '../img/cr90corvette.jpg',
  },
  {
    id: 'product2',
    name: 'Star Destroyer',
    manufacturer: 'Kuat Drive Yards',
    cost_in_credits: 150,
    image: '../img/stardestroyer.jpg',
  },
  {
    id: 'product3',
    name: 'Sentinel-class landing craft',
    manufacturer:
      'Sienar Fleet Systems, Cyngus Spaceworks',
    cost_in_credits: 24,
    image: '../img/sentinel.jpg',
  },
];

// Plantilla para la card
{
  /* <div class="col border border-2">
  <div class="card h-100">
    <h5 class="card-title">Title</h5>
    <p class="card-text bold-test">Text</p>
  </div>
</div>; */
}

// 1: Tomamos el control de los id necesarios e inicializamos lo que haga falta.

const cartContainer =
  document.getElementById('cart');
const catalogueContainer =
  document.getElementById('catalogue');
const btnClear = document
  .getElementById('btn-clear')
  .addEventListener('click', () => clearCart());
const total = document.getElementById('total');

let cart =
  JSON.parse(localStorage.getItem('cart')) || [];

//  Primer operando || Segundo Operando = verdadero si una

// 2: Poblar o inyectar o renderizar las cards dentro del catalogo.

PRODUCTS.forEach(p => {
  const card = document.createElement('div');
  card.className = 'col';

  card.innerHTML = `<div class="card h-100">
	<div class="card-body">
	<h5 class="card-title">${p.name}</h5>
	<p class="card-text bold-test">${p.manufacturer}</p>
	</div>
	<div class="card-footer bg-white border-0">$ ${p.cost_in_credits}</div>
	<div class="card-footer">
	<button id="${p.id}" class="btn btn-success">Buy</button>
	</div>
  </div>`;

  catalogueContainer.appendChild(card);

  const button = document
    .getElementById(p.id)
    .addEventListener('click', () =>
      buyProduct(p)
    );
});

function buyProduct(product) {
  const exists = cart.some(
    p => p.id === product.id
  );

  if (!exists) {
    product.q = 1;
    cart.push(product);
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  } else {
    const index = cart.indexOf(product);
    cart[index].q++;
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  }
  console.log(cart);
  updateCart();
}

function updateCart() {
  cartContainer.innerHTML = '';
  total.innerText = '';
  let cartTotal = 0;
  cart.forEach(p => {
    const card = document.createElement('div');
    card.className = 'col';

    card.innerHTML = `<div class="card h-100">
			<div class="card-body">
			<h5 class="card-title">${p.name} (${p.q})</h5>
			<p class="card-text bold-test">${
        p.manufacturer
      }</p>
			</div>
			<div class="card-footer bg-white border-0">Subtotal $ ${
        p.cost_in_credits * p.q
      }</div>
			<div class="card-footer">
			<button id="${
        p.id
      }" class="btn btn-danger">Delete</button>
			</div>
		</div>`;

    cartContainer.appendChild(card);
    cartTotal =
      cartTotal + p.q * p.cost_in_credits;
    total.innerText = `(Total $ ${cartTotal})`;

    const button = document
      .getElementById(p.id)
      .addEventListener('click', () =>
        delProduct(p)
      );
  });
}

function delProduct(product) {
  // Para borrar un elemento por indice suele utilizarse el splice (no confundir con slice)
  const index = cart.indexOf(product);

  if (product.q === 1) {
    cart.splice(index, 1);
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  } else {
    cart[index].q--;
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  }

  updateCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem(
    'cart',
    JSON.stringify(cart)
  );
  total.innerText = '';
  updateCart();
}

updateCart();
