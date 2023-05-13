import { Auth, Hub } from 'aws-amplify';
import React, { createContext, useCallback, useContext, useEffect, useState, Dispatch } from 'react';

export type AuthStatus = 'loading' | 'unauth' | 'auth';

export type AuthContextProps = {
  authStatus: AuthStatus;
  idToken: string;
  idUser: string; // ユーザーID
  setIdUser: Dispatch<React.SetStateAction<string>>;
};

const authContextPropsDefault = {
  authStatus: 'loading' as AuthStatus,
  idToken: '',
  idUser: '',
  setIdUser: () => {},
};

export type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(authContextPropsDefault);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => (
  <AuthContext.Provider value={authContextPropsDefault}>
    <AuthProviderRoot>{!(authContextPropsDefault.authStatus === 'loading') && children}</AuthProviderRoot>
  </AuthContext.Provider>
);

export const AuthProviderRoot: React.FC<AuthProviderProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<AuthStatus>('loading');
  const [idToken, setIdToken] = useState<string>('');
  const [idUser, setIdUser] = useState<string>('');

  const listener = useCallback(
    async (data: any) => {
      if (data.payload.event === 'signIn') {
        authContext.authStatus = 'auth';
        setState('auth');

        const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
        authContext.idToken = idToken;
        setIdToken(idToken);
      } else if (data.payload.event === 'signOut') {
        authContext.authStatus = 'unauth';
        setState('unauth');

        authContext.idToken = '';
        setIdToken('');
      }
      console.log(`[AuthProvider] listener ${JSON.stringify(authContext, null, 2)}`);
    },
    [authContext],
  );

  useEffect(() => {
    Hub.listen('auth', listener);
  }, [listener]);

  const getAuthStatus = async () => {
    let authState: AuthStatus = 'unauth';
    await Auth.currentSession()
      .then((session) => {
        authState = session.isValid() ? 'auth' : 'unauth';
      })
      .catch((error) => {
        console.log(error);
      });
    setState(authState);

    return authState;
  };

  const getIdToken = async () => {
    let idToken = '';
    await Auth.currentSession()
      .then((session) => {
        idToken = session.getIdToken().getJwtToken();
      })
      .catch((error) => {
        console.log(error);
      });
    setIdToken(idToken);

    return idToken;
  };

  const refresh = useCallback(async () => {
    authContext.authStatus = 'loading';
    authContext.idToken = '';

    authContext.authStatus = await getAuthStatus();
    authContext.idToken = await getIdToken();
  }, [authContext]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        authStatus: state,
        idToken: idToken,
        idUser: idUser,
        setIdUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return [authContext.authStatus] as const;
};

export const useIdToken = () => {
  const authContext = useContext(AuthContext);
  return [authContext.idToken] as const;
};

export const useIdUser = () => {
  const authContext = useContext(AuthContext);
  return [authContext.idUser] as const;
};