import Axios from "axios";

const CMC_KEY = "5571dcf4-41b7-4e23-8f8d-b1e938cc0697";


export default async function handler(req, res) {
  try {
    const { data } = await Axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest`,
      {
        params: {
          slug: "bitcoin",
        },
        headers: {
          "X-CMC_PRO_API_KEY": CMC_KEY,
        },
      }
    );
      console.log(data, data.data['1'].quote.USD.price)
    res.status(200).json({
      price:data.data['1'].quote.USD.price
    });
  } catch (ex) {
    console.log(ex)
    throw ex
  }
}

