import Head from "next/head";
import React, { useEffect } from "react";
import AppContact from "../components/contact";
import Layout from "../components/layout";
import AppMass from "../components/masses";
import { getContactInfo } from "../data/contact";
import { getMassess } from "../data/masses";
import AppAnnouncement from "../components/announcements";
import { getAnnouncements } from "../data/announcement";
import { getBibleVerse } from "../data/bibleVerse";
import { getAlert } from "../data/alert";
import AppAlert from "../components/alert";
import { useRouter } from "next/router";
import { analytics } from "../firebase/firebase";
import { logEvent, setCurrentScreen } from "firebase/analytics";

export default function IndexPage({
  bibleVerse,
  conactInfo,
  massSchedule,
  announcements,
  alert,
}) {

  const routers = useRouter();
  useEffect(() => {
    //if (process.env.NODE_ENV === 'production') {

      const logAnalytics = (url) => {
        setCurrentScreen(analytics, url);
        logEvent(analytics, 'home_view');
      };

      routers.events.on('routeChangeComplete', logAnalytics);
      //For First Page
      logAnalytics(window.location.pathname);

      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off('routeChangeComplete', logAnalytics);
      };
    //}
  }, []);

  return (
    <>
      <Head>
        <title>St Mary's Church Maharagama</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Home Page for St Mary's Church Maharagama"
        />
        <meta
          name="keywords"
          content="st mary, st mary's, st mary's maharagama, st athony's boralesgamuwa, st anthony, st athony's, maharagama, boralesgamuwa, catholic, catholic church, church, masses, mass times, mass time, office hours, parish priest "
        />

        <meta property="og:title" content="St Mary's Church Maharagama" />
        <meta
          property="og:description"
          content="St Mary's Church Maharagama | Mass times and other announcements"
        />
        <meta
          property="og:image"
          content="/static/assets/template/images/Mary.png"
        />
        <meta property="og:url" content="https://www.stmarysmaharagama.org" />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <div className="container-wrap">
          <aside id="fh5co-hero">
            <div className="flexslider">
              <ul className="slides">
                <li
                  style={{
                    backgroundImage:
                      "url('static/assets/template/images/cave.jpg')",
                  }}
                >
                  <div className="overlay"></div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-6 col-md-offset-3 text-center">
                        <div className="slider-text">
                          <div className="slider-text-inner">
                            <div className="image-text-overlay">
                              <h1 style={{ fontSize: "22px" }}>
                                {bibleVerse.text}
                              </h1>
                              <h2
                                style={{
                                  textAlign: "right",
                                  marginBottom: "5em",
                                }}
                              >
                                {bibleVerse.verse}
                              </h2>
                            </div>

                            <p>
                              {" "}
                              <a
                                className="btn btn-primary btn-learn"
                                href="/masses"
                              >
                                All Mass Times{" "}
                                <i className="icon-arrow-right3"></i>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              
              
            </div>
          </aside>

          <AppAlert alert={alert} />
          
          <AppMass massSchedule={massSchedule} />

          <hr />

          <AppAnnouncement announcements={announcements} />

          <hr />

          <AppContact contactInfo={conactInfo} />

          <hr />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const conactInfo = await getContactInfo();
  const massSchedule = await getMassess();
  const announcements = await getAnnouncements();
  const bibleVerse = await getBibleVerse();
  const alert = await getAlert();

  return {
    props: {
      bibleVerse,
      conactInfo,
      massSchedule,
      announcements,
      alert,
    },
  };
}
