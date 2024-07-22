import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const duration = localStorage
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) return;

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post'});
      return;
    };  

    const duration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post'});
    }, duration);
  },[token, submit, getTokenDuration])
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
