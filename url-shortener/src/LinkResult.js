// import { useEffect, useState } from 'react'
// import CopyToClipboard from "react-copy-to-clipboard";
// import axios from 'axios';
// import './LinkResult.css';
// const LinkResult = ({inputValue}) => {
//     console.log(inputValue);
//     const [shortenLink,setShortenLink] = useState("");
//     console.log(shortenLink);

//     const [copied,setCopied]=useState(false);
//     const [loading , setLoading] = useState(false);
//     const fetchData = async () =>{
//         try{
//             setLoading(true);
//             const res= axios(`https://shrtlnk.dev/api/v2/${inputValue}`);
//             setShortenLink(res.data);
//         }
//             catch(err){

//         }finally{

//         }
//     } 


//     useEffect(()=> {
//         if(inputValue.length){
//             fetchData();
//         }
//     })

//     useEffect(()=>{
//         const timer=setTimeout(()=>{
//             setCopied(false);
//         },1000);
//         return ()=> clearTimeout(timer);
//     },[copied])

//   return (
//     <div className='result'>
//         <p>{shortenLink}</p>
//         <CopyToClipboard 
//             text={shortenLink}
//             onCopy={()=> setCopied(true)}
//         >

//             <button className={copied? "copied":""}>Copy to clipboard</button>


//         </CopyToClipboard>
//     </div>
//   )
// }

// export default LinkResult


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
            const response = await axios.post('http://localhost:8001/url', { url: inputValue });
            
            const shortID = response.data.id;
            const shortenedURL = `http://localhost:8001/${shortID}`; // Concatenate short ID with base URL
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


