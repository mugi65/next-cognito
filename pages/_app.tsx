import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Amplify, Auth} from "aws-amplify";

const authConfigure = {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
}
Amplify.configure({
    Auth: authConfigure
})
Auth.configure(authConfigure)

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <Component {...pageProps} />
    )
}

export default MyApp
