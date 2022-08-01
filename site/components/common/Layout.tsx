import Head from "next/head";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "@components/context/AppContext";
import { wrapper } from "@components/store/store";
import client from "@components/apollo/client";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props: any) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <div>
          <Head>
            <title>Woocommerce React Theme</title>
          </Head>
          <Header />
          {props.children}
          <Footer />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

export default wrapper.withRedux(Layout);
