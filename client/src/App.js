import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Create from "./pages/Create";
import Holdings from "./pages/Holdings";
import User from "./pages/User";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
    return (
        // <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate to="/holdings" element={<Holdings />} />
                        }
                    />
                    <Route path="/holdings" element={<Holdings />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </BrowserRouter>
        </Provider>
        // </div>
    );
}
