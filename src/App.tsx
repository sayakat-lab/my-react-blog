import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
