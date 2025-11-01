import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Router from "router/Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
