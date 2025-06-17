import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Checkin from "./pages/Checkin";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route path="checkin/:bookingId" element={<Checkin />}></Route>
            <Route path="bookings/:bookingId" element={<Booking />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="cabins" element={<Cabins />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
