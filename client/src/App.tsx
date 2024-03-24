import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup, ActivationPage } from "./Routes.ts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
