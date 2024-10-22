import React from "react"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>holodle!</title>
                <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48"/>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <meta name="apple-mobile-web-app-title" content="holodle!"/>
            </head>
            <body className={`${inter.className} ${inter.className} antialiased transform-gpu`}>
                {children}
            </body>
        </html>
    )
}
