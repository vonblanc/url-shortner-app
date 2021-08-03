import {useEffect, useState} from "react";
import {getDataForShortUrl} from "../utils/ClientUtils";
import { useParams } from "react-router-dom";


const Stats = ()=>{
  let { shortUrl } = useParams();
  const [pathExist, setPathExist] = useState(false);
  const [fetchedData, setFetchedData] = useState({});

  useEffect(async ()=>{
    const data = await getDataForShortUrl(shortUrl);
    setFetchedData(data);
    if (data.longUrl){
      setPathExist(true);
    }
    else{
      setPathExist(false);
    }
  },[])


  return(<>
    <h1>Stats Baby</h1>
    <h3>Long Url: {fetchedData.longUrl} </h3>
    <h3>Short Url: {fetchedData.shortUrl}</h3>
    <h3>Visited: {fetchedData.timesVisited}</h3>
  </>)
}

export default Stats;