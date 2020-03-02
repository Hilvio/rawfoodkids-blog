// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import ReactGA from 'react-ga';
import { Cookies } from "react-cookie-consent";

export const onClientEntry = () => {
  const gaEnabled = Cookies.get('google-analytics')

  if (gaEnabled) {
    ReactGA.initialize(process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID);
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
    const gaEnabled = Cookies.get('google-analytics')

    if (gaEnabled) {
        ReactGA.set({ page: location.pathname, anonymizeIp: false });
        ReactGA.pageview(location.pathname);
    }
  }