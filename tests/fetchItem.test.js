require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it ('Testa se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function')
  });

  it ('Execute a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it ('ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {

    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it ('Testa se é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
 });

 it ('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    expect.assertions(1);
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });

});
