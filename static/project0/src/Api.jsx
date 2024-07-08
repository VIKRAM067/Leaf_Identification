import React, { useState } from 'react';
import Demo from './Demo';

const Api = () => {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [classRes, setClassRes] = useState(null); // Define classRes state

  const handleFunction = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        if (result.class === 'peepal') {
          setClassRes('https://www.kamaayurveda.in/blog/peepal-tree'); // Update classRes state
        }
      } else {
        console.log('failed,error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFunction} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {res && <Demo obj={classRes} />} {/* Conditionally render Demo component */}
    </div>
  );
};

export default Api;
