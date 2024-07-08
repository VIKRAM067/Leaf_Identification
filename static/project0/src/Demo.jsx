import { React, useEffect, useState } from 'react';
import { db } from './firebase'; // Import Firestore instance from firebase.jsx
import { collection, getDoc,doc } from 'firebase/firestore'; // Import Firestore modules
import link from './assets/link.png';
import upload from './assets/upload.png';
import { useLazyGetSummaryQuery } from './services/article';
import loader from './assets/loader.svg';

const Demo = (props) => {


  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [classRes, setClassRes] = useState(''); // Define classRes state
  const [image,setImage]=useState(null);
  const choosefile = (event) => {
    setFile(event.target.files[0]);

    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

/*-----------------------------------------------------------------------------*/

  
  const [article,setArticle] = useState({
    url:'',
    summary:''
  })

  const [allArticles , setAllArticles] = useState([])
  const [getsummary , {error,isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getsummary({
          articleUrl: article.url
        });
  
        if (data?.summary) {
          const newArticle = { ...article, summary: data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];
          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    if (article.url) {
      fetchSummary();
    }
    
  }, [article.url]);

  const handleFunction = async (e) =>{
      e.preventDefault();
/*---------------------------------------------------------------------------*/
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const endpoint = 'http://localhost:8000/predict/';
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('success');
          
          const result = await response.json();
          setRes(result);
          console.log(result.class);
          const resultClass = result.class;
          console.log(resultClass);
          setClassRes(resultClass);
//---------------------------------------------------Firestore---------------------------------------------------------------------------------------------------          
          
const collectionRef = collection(db, 'finder'); // Reference to the collection
const docRef = doc(collectionRef, 'foliage'); // Reference to the specific document within the collection
const docSnap = await getDoc(docRef); // Get the document snapshot

if (docSnap.exists()) {
  const fieldValue = docSnap.data()[resultClass]; 
  console.log("Field Value:", fieldValue);
  setArticle(prevState => ({
    ...prevState,
    url: fieldValue

  }));
} else {
  console.log("Document does not exist");
}
          
            
            
            
          
        } else {
          console.log('failed,error');
        }
      } catch (error) {
        console.log(error);
      }

/*------------------------------------------------------------------*/




      const {data} = await getsummary({
        articleUrl: article.url
      });

      if (data?.summary){
        const newArticle = {...article,summary:data.summary};
        const updatedAllArticles = [newArticle,...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles)
        
        localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
      }

      
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
    
    <div  className='flex flex-col w-full gap-2'>
      <form onSubmit={handleFunction}  className='relative flex justify-center items-center'>
        <img src={link} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5'/>
          <input type="file" onChange={choosefile} className='url_input peer' />
           {/* Display the uploaded image */}
     
        <button type="submit" className='submit_btn'> <img src={upload} alt="upload" className='w-5'/></button>
      </form>
    </div>




      <div className='flex flex-col w-full gap-2'>
      {image && (
        <div>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
      </div>
      
      <div className='my-10 max-w-full flex justify-center items-center'>
            {
              isFetching ? (
                  <img src={loader} alt="loader" className='w-10 h-10 object-contain'/>
              ) : error ? (
                <p className='font-bold font-inter text-black text-center'>An error occured
                  <br />
                  <span className='text-red-700 font-satoshi'>
                    {error?.data?.error}
                  </span>
                </p>
              ) : (
                article.summary && (
                  <div className='flex flex-col gap-3'>
                    <h2 className='text-gray-600 font-satoshi font-bold text-xl '>The Foliage is <span className='blue_gradient'> {classRes}</span></h2>
                    <div className='summary_box'>
                      <p>
                        {article.summary}
                      </p>
                    </div>
                  </div>
                )
              )
            }
      </div>

    </section>
  )
}

export default Demo