export const Auth = {
  region: process.env.NEXT_PUBLIC_REACT_APP_AUTH_REGION,
  userPoolId: process.env.NEXT_PUBLIC_REACT_APP_AUTH_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  authenticationFlowType: 'USER_SRP_AUTH',
};
