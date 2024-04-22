import { useEffect, useState } from 'react'
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';
import './LinkResult.css';
const LinkResult = ({inputValue}) => {
    console.log(inputValue);
    const [shortenLink,setShortenLink] = useState("");
    console.log(shortenLink);

    const [copied,setCopied]=useState(false);
    const [loading , setLoading] = useState(false);
    const fetchData = async () =>{
        try{
            setLoading(true);
            const res= axios(`https://shrtlnk.dev/api/v2/${inputValue}`);
            setShortenLink(res.data);
        }
            catch(err){

        }finally{

        }
    } 


    useEffect(()=> {
        if(inputValue.length){
            fetchData();
        }
    })

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setCopied(false);
        },1000);
        return ()=> clearTimeout(timer);
    },[copied])

  return (
    <div className='result'>
        <p>{shortenLink}</p>
        <CopyToClipboard 
            text={shortenLink}
            onCopy={()=> setCopied(true)}
        >

            <button className={copied? "copied":""}>Copy to clipboard</button>


        </CopyToClipboard>
    </div>
  )
}

export default LinkResult

