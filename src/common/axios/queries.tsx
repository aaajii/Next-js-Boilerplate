import axios from 'axios';
import moment from 'moment';

import { BasicObject } from '../types';

export const getSales = async (symbol: string, setSalesChartData: Function) => {
  const salesChart: any[] = [];

  // ME API
  // const { data } = await axios.get(
  //   `https://api-mainnet.magiceden.dev/v2/collections/${symbol}/activities?offset=0&limit=500`
  // );
  // `https://zenft.pro/api/proxy/activity/${symbol}`

  const tzOffset = moment().utcOffset() * 60;

  try {
    const { data } = await axios.get(
      `https://zenft.pro/api/me/sales/${symbol}`
    );

    data.forEach((sale: BasicObject) => {
      salesChart.push({
        time: sale.blockTime + tzOffset,
        value: sale.price,
        color: 'rgba(32, 226, 47, 0.56)',
      });
    });

    // const sales = data.results.filter((item) => item.txType === "exchange"); // type / butNOW == ME API, txType / exchange == ME
    //   sales.forEach((sale) => {
    //     salesChart.push({
    //       time: sale.blockTime,
    //       value: sale.parsedTransaction.total_amount / 1000000000,
    //       color: "rgba(32, 226, 47, 0.56)",
    //     });
    //   });

    setSalesChartData([{ data: [...salesChart] }]);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSolanaPrice = async () => {
  const {
    data: {
      solana: { usd: solana },
    },
  } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
  );

  console.log(solana);
  return solana;
};

export const getCollections = async () => {
  try {
    const { data } = await axios.get(`https://zenft.pro/api/me/collections`);

    const select: BasicObject[] = [];

    data.map((c: BasicObject) => {
      return select.push({ symbol: c.symbol, label: c.name, image: c.image });
    });

    return select;
  } catch (error) {
    console.error(`ERROR (getCollections): ${error}`);
    return [];
  }
};

export const getMEData = async () => {
  try {
    const { data } = await axios.get(
      'https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics?edge_cache=true'
    );

    return data.results;
  } catch (error) {
    console.error(`ERROR (getMEData): ${error}`);
    return [];
  }
};
