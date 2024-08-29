import React, { useState, useEffect } from "react";

interface ImageProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({
    src,
    width,
    height,
    alt,
    className = "",
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            // handle error, e.g., set fallback image
            setIsLoading(false);
            setImgSrc("/fallback-image.png"); // Example fallback image
        };
    }, [src]);

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    Loading...
                </div>
            )}
            <img
                src={imgSrc}
                alt={alt}
                className={`block ${isLoading ? "hidden" : "block"}`}
                style={{ width, height }}
                {...props}
            />
        </div>
    );
};

export default Image;
