const fetchItem = async (idProduct) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
