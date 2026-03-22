"use client";

import Layout from "@/components/Layout";
import TrueLensBanner from "@/components/TrueLens/Banner";
import TrueLensChat from "@/components/TrueLens/Chat";

const HomePage = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <TrueLensBanner />
                <TrueLensChat />
            </div>
        </Layout>
    );
};

export default HomePage;
