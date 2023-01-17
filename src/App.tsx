import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import {
  ACTIVITIES_ROUTE,
  GROUPS_ROUTE,
  LOGIN_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from "./consts/routes";
import { BaseLayout } from "./layouts/baseLayout/BaseLayout";
import ErrorPage from "./pages/error/ErrorPage";
import { HomePage } from "./pages/home/HomePage";
import { UsersManagementPage } from "./pages/usermanagegment/UsersManagementPage";
import LoginPage from "./pages/login/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import { ActivitiesPage } from "./pages/activities/ActivitiesPage";
import { GroupsPage } from "./pages/groups/GroupsPage";

function App() {
  const { isAuthenticated } = useAuth();
  const routes = useRoutes([
    {
      path: "",
      element: (
        <ProtectedRoute redirectPath={LOGIN_ROUTE} isAllowed={isAuthenticated}>
          <BaseLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: USERS_MANAGEMENT_ROUTE,
          element: <UsersManagementPage />,
        },
        {
          path: ACTIVITIES_ROUTE,
          element: <ActivitiesPage />,
        },
        {
          path: GROUPS_ROUTE,
          element: <GroupsPage />,
        },
      ],
    },
    {
      path: LOGIN_ROUTE,
      element: <LoginPage />,
    },
  ]);
  return routes;
}

export default App;
