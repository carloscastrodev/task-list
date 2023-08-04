import React from 'react';

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={'btn btn-primary'} {...props} />;
}
