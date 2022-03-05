import React, { useEffect, useState } from 'react';

import cn from 'classnames';

// Queries
import { getCollections, getMEData } from '@/common/axios/queries';
// Types
import { BasicObject } from '@/common/types';
// Utils
import { getPercentageChange, round } from '@/utils/math';

// Components
import TopCards from './TopCards';

const TopCollections = () => {
  // DATA INIT
  const [collections, setCollections] = useState<BasicObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dayFilter, setDayFilter] = useState('1d');

  // FUNCTIONS
  const handleCardClick = (symbol: string) => {
    const url = `/chart?symbol=${symbol}`;
    window.open(url, '_blank');
  };

  // RENDERS
  const renderDayFilter = () => {
    return (
      <div
        className={cn(
          'flex border border-gray-500 rounded w-auto max-h-8 flex-nowrap',
          { hidden: isLoading }
        )}
      >
        <div
          className={cn(
            'flex justify-center align-middle p-1.5 w-12',
            'hover:cursor-pointer text-sm text-semibold text-gray-200 rounded',
            {
              'bg-green-500': dayFilter === '1d',
            }
          )}
          onClick={() => setDayFilter('1d')}
        >
          1d
        </div>
        <div
          className={cn(
            'flex justify-center align-middle p-1.5 w-12',
            'hover:cursor-pointer text-sm text-semibold text-gray-200 rounded',
            {
              'bg-green-500': dayFilter === '7d',
            }
          )}
          onClick={() => setDayFilter('7d')}
        >
          7d
        </div>
        <div
          className={cn(
            'flex justify-center align-middle p-1.5 w-12',
            'hover:cursor-pointer text-sm text-semibold text-gray-200 rounded',
            {
              'bg-green-500': dayFilter === '30d',
            }
          )}
          onClick={() => setDayFilter('30d')}
        >
          30d
        </div>
      </div>
    );
  };

  const filterCollections = (data: BasicObject[]) => {
    return data.map(
      ({
        // volume,
        // volumePercent,
        // floorPercent,
        txVolume,
        floorPrice,
        ...rest
      }: any) => {
        switch (dayFilter) {
          case '7d':
            return {
              floorPercent: round(
                getPercentageChange(floorPrice.value1d, floorPrice.prev7d)
              ),
              volume: round(txVolume.value7d),
              volumePercent: round(
                getPercentageChange(txVolume.value7d, txVolume.prev7d)
              ),
              txVolume,
              floorPrice,
              ...rest,
            };
          case '30d':
            return {
              floorPercent: round(
                getPercentageChange(floorPrice.value1d, floorPrice.prev30d)
              ),
              volume: round(txVolume.value30d),
              volumePercent: round(
                getPercentageChange(txVolume.value30d, txVolume.prev30d)
              ),
              txVolume,
              floorPrice,
              ...rest,
            };

          default:
            return {
              floorPercent: round(
                getPercentageChange(floorPrice.value1d, floorPrice.prev1d)
              ),
              volume: round(txVolume.value1d),
              volumePercent: round(
                getPercentageChange(txVolume.value1d, txVolume.prev1d)
              ),
              txVolume,
              floorPrice,
              ...rest,
            };
        }
      }
    );
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      // Transform ME data to match backend collection of symbols
      const symbols = await (
        await getCollections()
      ).map(({ symbol }: any) => symbol);
      const getMagicEdenQuery = await getMEData();

      if (collections.length < 1) {
        const sortedCollection = getMagicEdenQuery
          .filter(({ symbol }: any) => {
            return symbols.includes(symbol);
          })
          .map(({ floorPrice, txVolume, symbol, name, image }: any) => {
            return {
              // Top 12 Fields
              imageUrl: image,
              name,
              symbol,

              // Day Filters
              txVolume,
              floorPrice,
            };
          });
        setCollections(filterCollections(sortedCollection));
      }
    };

    if (collections.length > 1) {
      setIsLoading(false);
    } else {
      initializeData();
    }
  }, [collections, isLoading]);

  useEffect(() => {
    setCollections(filterCollections(collections));
  }, [dayFilter]);

  return (
    <div className="flex flex-col mx-auto mt-20 max-w-7xl align-center">
      {/* Top 12 Cards */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-2xl animate-fade-in-down">
              Top 12 Projects 🤩
            </h1>
            <p className="mt-2 text-gray-500 text-md">
              The best projects on Solana based on Volume
            </p>
          </div>
          {renderDayFilter()}
        </div>

        <TopCards
          collections={filterCollections(collections)}
          isLoading={isLoading}
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default TopCollections;
