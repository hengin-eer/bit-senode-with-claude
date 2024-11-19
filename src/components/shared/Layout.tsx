import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};
