import React from "react";
import { useDispatch } from "react-redux";
import authservice_obj from "../../appwrite/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn({ onLogout }) {
  const dispatch = useDispatch();
  const logouthandler = () => {
    authservice_obj.logout().then(() => {
      dispatch(logout());
      onLogout?.();
    });
  };
  return (
    <button
      className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700 sm:w-auto sm:rounded-full sm:px-4 sm:py-2"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
