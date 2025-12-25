import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import UserPage from "./pages/users";
import ProtectedLayout from "./pages/common/protected-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/users/:userId" element={<UserPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
