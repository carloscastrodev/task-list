import React from 'react';

export function DangerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={'btn btn-danger'} {...props} />;
}
