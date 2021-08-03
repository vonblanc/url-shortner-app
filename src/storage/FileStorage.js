const fs  = require('fs');
const util = require('util');
const FileReader = require('filereader');

const open = util.promisify(fs.open);
const write = util.promisify( fs.writeFile);
const writeSync = fs.writeFileSync;
const read = util.promisify(fs.readFile);

const storageDir = '/Users/richard/Documents'
const fileLocation =`${storageDir}/fileStorage.json`;

const fetchStorage = async ()=>{

  if (!fs.existsSync(storageDir)){
    fs.mkdirSync(storageDir);
  }
  if(!fs.existsSync(fileLocation)){
    writeSync(fileLocation, '' , 'utf-8');
  }

  const data = await read(fileLocation);
  if(data.length > 0 ){
    return JSON.parse(data);
  }
  else{
    return {};
  }
}

const writeToStorage = async (urlData)=>{
 const storage =  await fetchStorage()
  if (!urlData.shortUrl)  throw new Error("Invalid file url");
  storage[urlData.shortUrl] = urlData;
  await write(fileLocation, JSON.stringify(storage) , 'utf-8');
}

const getUrlRecord = async (shortUrl)=>{
  const storage = await fetchStorage();
  const result = storage[shortUrl.trim()];
  return result;
}

module.exports = {
  getUrlRecord,
  writeToStorage,
  fetchStorage,
  write
}