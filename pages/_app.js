import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/query-client";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from "./layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
