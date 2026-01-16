import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import UserPage from "./pages/users";
import GroupPage from "./pages/groups";
import GroupReportsPage from "./pages/groups/reports";
import GroupChoresPage from "./pages/groups/chores";
import GroupSettingsPage from "./pages/groups/settings";
import ProtectedLayout from "./pages/common/protected-layout";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="/groups/:groupId" element={<GroupPage />} />
          <Route path="/groups/:groupId/reports" element={<GroupReportsPage />} />
          <Route path="/groups/:groupId/chores" element={<GroupChoresPage />} />
          <Route path="/groups/:groupId/settings" element={<GroupSettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
