import '../styles/globals.css';
import { SWRConfig } from 'swr';

import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return  (
    <div className="container mx-auto my-auto">
      <h1>NextJS PowerPlayer Demo</h1>
      <menu className="container my-5">
      <Link href="/standard/podcasts"><a className="btn-menu">Using SWR</a></Link>
      <Link href="/ssr/podcasts"><a className="btn-menu">Using SSR</a></Link>
      <Link href="/ssg/podcasts"><a className="btn-menu">Using SSG</a></Link>

      </menu>
      <hr/>

      <SWRConfig value={{
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        refreshInterval: 400000}}>
        <div className="container">
          <Component { ...pageProps} />
        </div>
      </SWRConfig>
    </div>
  );
}

export default MyApp
