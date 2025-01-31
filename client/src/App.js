import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Create from "./pages/Create";
import Holdings from "./pages/Holdings";
import User from "./pages/User";
import WatchList from "./pages/WatchList";
import Hold from "./pages/Hold";
import Navigation from "./components/Navigation";
import MobileMenu from "./components/MobileMenu";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
    const { isAuthenticated } = useAuth0();
    return (
        <Provider store={store}>
            {isAuthenticated ? (
                <BrowserRouter>
                    <Navigation />
                    <MobileMenu />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate
                                    to="/holdings"
                                    element={<Holdings />}
                                />
                            }
                        />
                        <Route path="/holdings" element={<Holdings />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/watch" element={<WatchList />} />
                        <Route path="/hold/:hold" element={<Hold />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <LoginButton />
            )}
        </Provider>
    );
}
