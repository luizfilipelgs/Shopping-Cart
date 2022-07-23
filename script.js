const ol = document.querySelector('.cart__items');
const items = document.querySelector('.items');

const totalPrice = async () => {
  const div = document.querySelector('.total-price');
  const li = document.querySelectorAll('.cart__item p');
  const arrayLi = [...li];
  const priceLi = arrayLi.map((element) => Number(element.innerText.split('$')[1]));
  console.log(`valores li ${priceLi}`);
  const priceTotal = priceLi.reduce((a, b) => a + b, 0);
  div.innerText = `TOTAL: R$ ${priceTotal.toFixed(2)}`;
};

// ----------------- Funções auxiliares de contrução de elementos ----------------------------//
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createProductImageCart = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'cart__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}; 

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// ------------------------------ Funções de loading ----------------------------//
const loading = () => {
  const sectionItems = items;
  sectionItems.appendChild(createCustomElement('h2', 'loading', 'Carregando...'));
};

const loaded = () => {
  document.querySelector('.loading').remove();
};

// -------------------------------- Funções LocalStorage ------------------------------------//
const saveLocalStorage = () => {
  saveCartItems(ol.innerHTML);
};

const getLocalStorage = () => {
  const cartItems = ol;
  cartItems.innerHTML = getSavedCartItems();
};

// ---------------------------------------- Funções da sessão Carrinho --------------------------------//

const cartItemClickListener = (event) => {
  console.log(event);
  event.path[1].remove();
  saveLocalStorage();
  totalPrice();
};

const addListernerInProductsCar = () => {
  const productsCart = document.querySelectorAll('.trash');
  productsCart.forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
};

const createCartItemElement = ({ sku, name, salePrice, img }) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
    div.className = 'cart__item';
  div.appendChild(createProductImageCart(img));
  div.appendChild(p);   
  const trash = createCustomElement('button', 'trash', 'X');
  trash.addEventListener('click', cartItemClickListener);
  div.appendChild(trash);
  p.innerText = `${name} | Preço: R$ ${salePrice}`; /* Cod: ${sku} |  */
  console.log(img);
  return div;
};

const fetchParameterCartItem = async (idElement) => {
  const data = await fetchItem(idElement);
  const { id, title, price, thumbnail } = data;
  console.log(`Retorno da func fetchParameterCartItem ${id} ${title} ${price} ${thumbnail}`);
  const sectionParameters = createCartItemElement({ 
    sku: id, name: title, salePrice: price, img: thumbnail });
  ol.appendChild(sectionParameters);
  return data;
};

const cleanCart = () => {
  ol.innerHTML = '';
  localStorage.clear();
  totalPrice();
};

const addListernerBtnCart = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', cleanCart);
};

// ------------------------------------- Funções da lista de itens --------------------------------//
const createProductItemElement = ({ sku, name, image, value }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const img = image.replace('I', 'W');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(img));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${value}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const captureIdBtn = async (event) => {
  const idElement = getSkuFromProductItem(event.path[1]);
  console.log(idElement);
  await fetchParameterCartItem(idElement);
  saveLocalStorage();
  totalPrice();
 };

const addListernerAllBtn = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', captureIdBtn);
  });
};

const fetchParametersProducts = async (product) => {
  items.innerHTML = '';
  loading();
  const data = await fetchProducts(product);
  console.log(data);
  loaded();
  const objResult = data.results;
  objResult.forEach(({ id, title, thumbnail, price }) => {
    const sectionParameters = createProductItemElement({ 
      sku: id, name: title, image: thumbnail, value: price });
    items.appendChild(sectionParameters);
  });
  addListernerAllBtn();
};

const cleanInputText = () => {
  document.querySelector('#input-src').value = '';
};

const searchProduct = () => {
  const textInput = document.querySelector('#input-src').value;
  console.log(textInput);
  fetchParametersProducts(textInput);
  cleanInputText();
  };

const addListernerBtnSrc = () => {
  const btnSrc = document.querySelector('#btn-src');
  btnSrc.addEventListener('click', searchProduct);
};

// -------------------------------------------------------------------------------//
window.onload = () => {
  fetchParametersProducts();
  addListernerBtnCart();
  getLocalStorage();
  addListernerInProductsCar();
  totalPrice();
  addListernerBtnSrc();
};
