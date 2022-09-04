import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document';
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html className="h-full bg-gray-100" lang={'en'}>
                <Head>
                    <meta name="description" content="Auth base template"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <body className="h-full">
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument