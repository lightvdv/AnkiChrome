import word from './Editor';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetRequestHooks() {
  const [totalReactPackages, setTotalReactPackages] = useState(null);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('https://dictionary.skyeng.ru/api/public/v1/words/search?search=' + word)
      .then(response => setTotalReactPackages(response.data.total));


  }, []);
  alert(totalReactPackages)
  return (
    <div className="card text-center m-3">
      <h5 className="card-header">GET Request with React Hooks</h5>
      <div className="card-body">
        Total react packages: {totalReactPackages}

      </div>
    </div>
  );
}

export { GetRequestHooks };