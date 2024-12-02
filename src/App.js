import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "./router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
// ** Router Import

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
