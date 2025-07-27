import React from "react";

interface WalletLayoutProps {
    children:React.ReactNode;
};

export default function WalletLayout({children}:WalletLayoutProps){
    return (
        <div className="max-w-6xl mx-auto p-4">
            {children}
        </div>
    );
}