import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react'


type Props = {
  children: React.ReactNode
}

export default function Auth0ProviderWithNavigate({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  // const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;

  if (!domain || !clientId ) {
    throw new Error("unable to initialize auth");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: "http://localhost:5173/student-home" }}
    >
      {children}
    </Auth0Provider>)
}
