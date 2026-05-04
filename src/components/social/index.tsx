import { type ReactNode } from "react";

interface SocialProps {
    url: string;
    children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
    return (
        <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        </div>
    );
}
