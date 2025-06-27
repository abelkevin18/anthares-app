import { Navigate, Route, Routes } from "react-router-dom";
import { CreateUser } from "../components/users/CreateUser";
import { ListUser } from "../components/users/ListUser";

export const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="users/create"
                element={<CreateUser />}
            />
            <Route
                path="users/list"
                element={<ListUser />}
            />
        </Routes>
    )
}
