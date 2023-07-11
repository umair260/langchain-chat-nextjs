import { DirectoryLoader } from "langchain/document_loaders";
import { TextLoader, PDFLoader } from "langchain/document_loaders";
import path, { dirname } from 'path'
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";



export default async function (req, res) {


  // const dirName="/Users/umair/Downloads/tt";
  const arre=[];
  //  const  loader = await new DirectoryLoader(dirName,{
  //   ".txt": (path) => new TextLoader(path),
  //    ".pdf": (path) => new PDFLoader(path, "text"),
  // });
  // const docsStored= await loader.load();


  const loader = new CheerioWebBaseLoader(
    "https://esgdata.blockoffsets.com/feed/"
  );
  
  const docsStored = await loader.load();
  console.log(docsStored)
  
  let arr='';
  for (let i=0;i<docsStored.length;i++)
  {
    arr+= docsStored[i].pageContent;
    console.log(docsStored[i].metadata)
    if (arre.includes(path.basename(docsStored[i].metadata.source)))
    {
      console.log('Exists')
    } else{
      arre.push(path.basename(docsStored[i].metadata.source))
    }
  }
  
  res.json({
    arr,
    arre})
  }
