import { AmplifyAuthenticator } from "@aws-amplify/ui-react-v1";
import { useEffect, useState } from "react";
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";
import { CognitoUserSession } from "amazon-cognito-identity-js";

type AuthData = {
  authState?: AuthState;
  user?: CognitoUserInterface;
  session?: CognitoUserSession;
};

const Page = () => {
  const [data, setData] = useState<AuthData>({});
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      Auth.currentSession().then((result) => {
        setData({
          authState: nextAuthState,
          user: authData as CognitoUserInterface,
          session: result,
        });
      });
    });
  }, []);

  return data.authState === AuthState.SignedIn ? (
    <div>
      <p>{`Hello ${data.user?.username}`}</p>
      <p>AccessToken:</p>
      <p>{data.session?.getAccessToken().getJwtToken()}</p>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default Page;
