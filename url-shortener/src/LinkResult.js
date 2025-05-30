import React, { useEffect, useState } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';
import './LinkResult.css';

const LinkResult = ({ inputValue }) => {
    const [shortenLink, setShortenLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Send POST request to deployed backend
            const response = await axios.post(
                'https://url-shortner-service-backend.onrender.com/url',
                { url: inputValue }
            );

            const shortID = response.data.id;

            // Construct the full shortened URL using Render base URL
            const shortenedURL = `https://url-shortner-service-backend.onrender.com/${shortID}`;
            setShortenLink(shortenedURL);

        } catch (error) {
            console.error('Error fetching shorten link:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inputValue) {
            fetchData();
        }
    }, [inputValue]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopyToClipboard = () => {
        setCopied(true);
        navigator.clipboard.writeText(shortenLink);
    };

    return (
        <div className='result'>
            <p className='output'>{loading ? "Loading..." : shortenLink}</p>
            <CopyToClipboard
                text={shortenLink}
                onCopy={handleCopyToClipboard}
            >
                <button className={copied ? "copied" : ""} disabled={loading}>
                    {loading ? 'Loading...' : 'Copy to clipboard'}
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default LinkResult;
