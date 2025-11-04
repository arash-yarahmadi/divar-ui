import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Router from "router/Router";
import defaultOptions from "config/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layouts/Layout";

function App() {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
            }}
          />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
