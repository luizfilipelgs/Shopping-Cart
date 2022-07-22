const fetchProducts = async (produto) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
