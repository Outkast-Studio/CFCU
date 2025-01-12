import React from 'react'

export const LeftAlignedText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="text-left">{children}</div>

export const CenterAlignedText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="text-center">{children}</div>

export const RightAlignedText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="text-right">{children}</div>
