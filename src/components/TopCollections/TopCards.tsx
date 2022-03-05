import { FC } from 'react';

import times from 'lodash/times';
import { useRouter } from 'next/router';

import { BasicObject } from '@/common/types';

import Card from '../Card';
import LoadingScreen from '../LoadingScreen';
import { PLACEHOLDER_TYPE, SHADE } from '../Placeholder';

interface Props {
  collections: BasicObject[];
  onCardClick: any;
  isLoading: boolean;
}

const TopCards: FC<Props> = ({ collections, onCardClick, isLoading }) => {
  const router = useRouter();
  const sortedCollections = collections.sort(
    (a: BasicObject, b: BasicObject) => {
      return b.volume - a.volume;
    }
  );
  return (
    <div className="grid grid-cols-1 gap-2 w-full md:grid-cols-3 dark">
      {isLoading
        ? times(6, () => (
            <LoadingScreen
              type={PLACEHOLDER_TYPE.HEADING}
              shade={SHADE.LIGHT}
            />
          ))
        : sortedCollections
            .slice(0, 12)
            .map(
              (
                { floor, symbol, name, imageUrl, volume }: any,
                index: number
              ) => (
                <Card
                  className="flex justify-between py-2 max-w-lg dark:bg-gray-800 transition duration-500 hover:scale-110 hover:cursor-pointer"
                  key={index}
                >
                  <div
                    className="flex items-center"
                    onClick={() => {
                      onCardClick(symbol);
                    }}
                  >
                    <span className="mr-4 text-lg text-gray-500">
                      {index + 1}
                    </span>
                    <img
                      className="mr-2 w-8 rounded-full border border-gray-100 shadow-sm"
                      src={imageUrl}
                      alt={symbol}
                    />
                    <div className="flex flex-col justify-between">
                      <span className="w-40 text-lg truncate">{name}</span>
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2 text-sm">Floor:</span>
                        <img
                          className="w-4 h-4"
                          src={`${router.basePath}/assets/images/sol_50px.png`}
                          alt="solana"
                        ></img>
                        <span className="text-sm">{floor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-right">
                    <p className="text-md">${volume}</p>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      1D Volume
                    </span>
                  </div>
                </Card>
              )
            )}
    </div>
  );
};

export default TopCards;
