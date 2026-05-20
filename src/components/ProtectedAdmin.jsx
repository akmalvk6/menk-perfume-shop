import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout.jsx";

export default function ProtectedAdmin() {
  const isAuthed = sessionStorage.getItem("menk-admin-auth") === "true";

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
