import Swal from 'sweetalert2';
// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;

// function to chekc if authenticated or not
export const isAuthenticated = () => {
  if (window.localStorage.getItem('token') !== null) {
    return true;
  } else {
    return false;
  }
};

//function to logout
export const logOut = () => {
  window.localStorage.clear();
  // Redirect to login
  window.location.href = './login';
};

// Function to login
export const login = async (password) => {
  const endpoint = '/auth/authenticate';
  const url = baseUrl + endpoint;

  // The data sent to authenticate
  const data = {
    password: password,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const responseJson = await response.json();

  if (response.ok) {
    window.localStorage.setItem('token', responseJson.token);
    // Redirect to dashboard
    window.location.href = './dashboard';
  } else {
    // Handle join date request error
    const errorMessage = responseJson.message;
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};
