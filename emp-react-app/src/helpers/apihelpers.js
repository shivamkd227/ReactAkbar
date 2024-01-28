// Fetch utility functions

const fetchGet = (url, headers = {}) => {
    return fetch(url, {
      method: 'GET',
      headers: new Headers(headers)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  
  const fetchPost = (url, headers = {}, payload = {}) => {
    return fetch(url, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json', ...headers}),
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  
  const fetchPut = (url, headers = {}, payload = {}) => {
    return fetch(url, {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/json', ...headers}),
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  
  const fetchDelete = (url, headers = {}) => {
    return fetch(url, {
      method: 'DELETE',
      headers: new Headers(headers)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  
  export { fetchGet, fetchPost, fetchPut, fetchDelete };
  