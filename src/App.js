import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages";
import Rgpd from "./pages/Rgpd";
import NoMatch from "./pages/404";

const App = () => {
  return (
    <BrowserRouter>
      <Routes onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={<Rgpd />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
