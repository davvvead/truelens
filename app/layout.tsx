import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/Satoshi-Light.woff2",
            weight: "300",
        },
        {
            path: "../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
        },
        {
            path: "../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
        },
        {
            path: "../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-satoshi",
});

const interDisplay = localFont({
    src: [
        {
            path: "../public/fonts/InterDisplay-Medium.woff2",
            weight: "500",
        },
    ],
    variable: "--font-inter-display",
});

export const metadata: Metadata = {
    title: "TrueLens",
    description: "TrueLens: Canadian opportunity discovery tool that audits AI responses for regional blind spots.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className="text-[calc(0.7rem+0.35vw)] max-[2300px]:text-[calc(0.7rem+0.32vw)] max-[2150px]:text-[calc(0.7rem+0.28vw)] max-4xl:text-[1rem]"
            lang="en"
            suppressHydrationWarning
        >
            <head>
                {/* Description no longer than 155 characters */}
                <meta
                    name="description"
                    content="TrueLens audits AI responses for Canadian regional blind spots — surfacing the programs and opportunities AI models consistently miss."
                />

                <meta
                    name="product-name"
                    content="TrueLens"
                />

                {/* Twitter Card data */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@truelens" />
                <meta
                    name="twitter:title"
                    content="TrueLens — AI Blind Spot Auditor for Canada"
                />
                <meta
                    name="twitter:description"
                    content="TrueLens audits AI responses for Canadian regional blind spots — surfacing the programs and opportunities AI models consistently miss."
                />
                <meta name="twitter:creator" content="@truelens" />

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="TrueLens — AI Blind Spot Auditor for Canada"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="TrueLens audits AI responses for Canadian regional blind spots — surfacing the programs and opportunities AI models consistently miss."
                />
                <meta
                    property="og:site_name"
                    content="TrueLens"
                />

                {/* Open Graph data for LinkedIn */}
                <meta
                    property="og:title"
                    content="TrueLens — AI Blind Spot Auditor for Canada"
                />
                <meta
                    property="og:description"
                    content="TrueLens audits AI responses for Canadian regional blind spots — surfacing the programs and opportunities AI models consistently miss."
                />

                {/* Open Graph data for Pinterest */}
                <meta
                    property="og:title"
                    content="NeuraTalk: Coded AI Chat Companion"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/slabdsgn/products/elitefinancial---fintech-html--react--tailwind"
                />
                <meta
                    property="og:image"
                    content="https://neuratalk-tau.vercel.app/pinterest-og-image.png"
                />
                <meta
                    property="og:description"
                    content="A powerful coded AI chat experience"
                />
            </head>
            <body
                className={`${satoshi.variable} ${inter.variable} ${interDisplay.variable} bg-weak-50 font-satoshi text-p-sm text-strong-950 antialiased`}
                suppressHydrationWarning
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
