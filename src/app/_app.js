import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../../lib/gtag";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Google Ads - Start */}
        {/* Google Adsense */}
        {/* google adsense its enough for automatically adding ads */}
        {/* <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src= "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8764830534484668"
        /> */}
        {/* Google Ads - End */}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Google - End */}
      </Head>

      {/* Google Analytics - Start */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      {/* Google Analytics - End */}

      <main>
        <Component {...pageProps} />
        <style jsx global>{`
          body,
          html {
            margin: 0px !important;
            padding: 0 !important;
            overflow-x: hidden;
            width: 100%;
          }

          .container,
          .content {
            max-width: 100%;
            overflow-x: hidden;
            padding: 0;
          }

          img,
          video {
            max-width: 100%;
            height: auto;
            display: block;
          }

          .full-width-component {
            width: 100vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            overflow-x: hidden;
          }
        `}</style>
      </main>
    </>
  );
};

export default App;
