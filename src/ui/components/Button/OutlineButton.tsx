import React from 'react';

export function OutlineButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={`btn btn-outline`} {...props} />;
}
