import React, { FC, useState } from 'react';

import cn from 'classnames';

const noOp = () => null;

interface Props {
  children: any;
  className?: string;
  collapse?: boolean;
  header?: string;
  style?: object;
  compact?: boolean;
}

/**
 * Basic Card component
 *
 * @param props
 * @returns Component
 */
const Card: FC<Props> = ({ children, className, collapse, header, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  const renderChildren = () => {
    if (!collapse) {
      return children;
    }

    return (
      <div
        className={cn('card-content', {
          hidden: collapse && !isOpen,
        })}
      >
        {children}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'card',
        'box-border p-4 bg-white dark:bg-gray-700 rounded-lg shadow',
        // { 'mobile-l:py-8 mobile-l:px-6': !compact },
        className
      )}
      style={style}
    >
      {header && (
        <div
          className="relative pr-8 text-base font-semibold cursor-pointer"
          onClick={collapse ? toggleCollapse : noOp}
        >
          {header}
          {collapse && (
            <span className={cn('collapse-chevron', { bottom: !isOpen })} />
          )}
        </div>
      )}
      {renderChildren()}
    </div>
  );
};

export default Card;
