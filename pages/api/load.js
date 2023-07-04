import { DirectoryLoader } from "langchain/document_loaders";
import { TextLoader, PDFLoader } from "langchain/document_loaders";
import path, { dirname } from 'path'



export default async function (req, res) {
  const dirName="/Users/umair/Documents/people";
  const arre=[];
   const  loader = await new DirectoryLoader(dirName,{
    ".txt": (path) => new TextLoader(path),
     ".pdf": (path) => new PDFLoader(path, "text"),
  });
  const docsStored= await loader.load();
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
