import React from 'react'

export const SubScript: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <sub>{children}</sub>

export const SuperScript: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <sup>{children}</sup>

export const Small: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <p style={{ fontSize: '12px' }}>{children}</p>

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p
    style={{
      fontSize: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1.6px',
    }}
  >
    {children}
  </p>
)
