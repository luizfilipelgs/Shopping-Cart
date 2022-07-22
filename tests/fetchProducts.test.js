require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  
  it ('Testa se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function')
  });

  it ('Executa a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it ('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it ('Testa se é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  
  it ('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    expect.assertions(1);
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });

});
