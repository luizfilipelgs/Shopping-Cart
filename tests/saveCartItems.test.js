const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  const argHtml = '<ol><li>Item</li></ol>'  

  it ('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems(argHtml);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it ('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
   
    saveCartItems(argHtml);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argHtml)
  });
});
