import Home from '../pages/Home';
import AuthRedirect from '../pages/AuthRedirect';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function MainRouter() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/:providerName/redirect" element={<AuthRedirect />} />
    </Routes>
    </Router>
  );
}

export default MainRouter;
