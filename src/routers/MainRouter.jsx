import Home from '../pages/Home';
import AuthRedirect from '../pages/AuthRedirect';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentsSuccess from '../pages/PaymentsSuccess';

function MainRouter() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/:providerName/redirect" element={<AuthRedirect />} />
        <Route path="payments/success" element={<PaymentsSuccess />} />
    </Routes>
    </Router>
  );
}

export default MainRouter;
