import "@assets/styles/style.scss";
import "@assets/styles/main.scss";

import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import type { AppProps } from "next/app";

/**
 * MyApp config
 * @param {Component} - Component
 * @return {Component} - Component
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
