import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';

const Layout = () => {
  return (
    <>
      <main className="w-full text-gray-700 antialiased">
        <div className="mx-auto max-w-screen">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
