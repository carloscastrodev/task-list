import React from 'react';

export function IconButton({
  iconSource,
  alt,
  ...rest
}: {
  iconSource: string;
  alt: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btm btn-ghost`} {...rest}>
      <img src={iconSource} alt={alt} className="h-4 w-4 lg:h-6 lg:w-6" />
    </button>
  );
}
