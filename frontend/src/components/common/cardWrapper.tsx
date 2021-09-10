import React, { ReactNode } from 'react';
import './cardWrapper.scss';

export const CardWrapper = ({ children }: { children: ReactNode } ) => {
  return (
    <div className="card-wrapper">
      {children}
    </div>
  )
}
