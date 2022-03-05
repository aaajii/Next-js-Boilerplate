// NPM packages
import React from 'react';

import cn from 'classnames';
import omit from 'lodash/omit';

// Styled components
import './Placeholder.module.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum PLACEHOLDER_TYPE {
  IMAGE = 'image',
  HEADING = 'heading',
  BODY_TEXT = 'bodyText',
  PARAGRAPH = 'paragraph',
}

export enum SHADE {
  LIGHT = 'light',
  DARK = 'dark',
}

interface Props {
  className?: string;
  inline?: boolean;
  lines?: number[];
  loaderClassName?: string;
  shade?: SHADE;
  type?: PLACEHOLDER_TYPE;
}
interface BaseProps {
  className?: string;
  inline?: boolean;
  loaderClassName?: string;
  shade: SHADE;
  type: PLACEHOLDER_TYPE;
  style?: {
    [key: string]: string | number;
  };
}

const PlaceholderBase = (baseProps: BaseProps) => {
  const extraProps = omit(baseProps, [
    'className',
    'inline',
    'loaderClassName',
    'shade',
    'type',
  ]);

  const { className, inline, loaderClassName, shade, type } = baseProps;

  return (
    <div
      className={cn(
        className,
        'placeholder',
        {
          'placeholder--light': shade === SHADE.LIGHT,
          'placeholder--dark': shade === SHADE.DARK,
          'placeholder--heading': type === PLACEHOLDER_TYPE.HEADING,
          'placeholder--bodyText': type === PLACEHOLDER_TYPE.BODY_TEXT,
          'placeholder--image': type === PLACEHOLDER_TYPE.IMAGE,
          'placeholder--paragraph': type === PLACEHOLDER_TYPE.PARAGRAPH,
          inline,
        },
        // Can also be styled by providing custom className
        loaderClassName
      )}
      {...extraProps}
    />
  );
};

const Placeholder = ({
  className,
  inline = false,
  lines = [8.2, 9, 4, 0, 4.5, 5],
  loaderClassName,
  shade = SHADE.DARK,
  type = PLACEHOLDER_TYPE.BODY_TEXT,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderParagraph = (lines: number[], props: BaseProps) => {
    const placeholderLines = [];
    for (let line = 0; line <= lines.length; line += 1) {
      const width = `${(lines[line] || 8.2) * 10}%`;
      const style = { width };
      placeholderLines.push(
        <PlaceholderBase {...props} key={line} style={style} />
      );
    }
    return placeholderLines;
  };

  const renderPlaceholder = (placeholderType: PLACEHOLDER_TYPE) => {
    const baseProps = {
      className,
      inline,
      loaderClassName,
      shade,
      type: placeholderType,
    };

    if (placeholderType === PLACEHOLDER_TYPE.PARAGRAPH) {
      return renderParagraph(lines, baseProps);
    }

    return (
      <PlaceholderBase
        {...baseProps}
        type={placeholderType || PLACEHOLDER_TYPE.BODY_TEXT}
      />
    );
  };

  return <div className="animate-pulse">{renderPlaceholder(type)}</div>;
};

export default Placeholder;
