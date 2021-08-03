
 export const getDataForShortUrl = async (shortUrl)=>{
    if (shortUrl) {
      let urlObj = new URL(`${window.location.origin}/api/url`);
      urlObj.searchParams.append("shortUrl", shortUrl);

      const response = await fetch(urlObj, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      return await response.json();
    }
}

export const updateUrls = async (shortUrl)=>{
  let urlObj = new URL(`${window.location.origin}/api/url/update`);
  const response = await fetch(urlObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({shortUrl}),
  });
  return await response.json();
}