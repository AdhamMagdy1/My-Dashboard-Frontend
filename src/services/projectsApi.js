import Swal from 'sweetalert2';

// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;

// Function To Get All The Projects
export const getAllProjects = async () => {
  const endpoint = '/api/projects'; // Fix the typo
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  try {
    const responseData = await response.json(); // Await the json() method
    if (response.ok) {
      return responseData;
    } else {
      const errorMsg = responseData.message;
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorMsg,
      });
    }
  } catch (error) {
    // Handle JSON parsing error or other issues
    console.error('Error parsing JSON:', error);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'An unexpected error occurred.',
    });
  }
};

// Function to create a new project (add project)
export const createNewProject = async (projectData) => {
  const endpoint = '/api/projects';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token'); // Fix the typo

  const data = {
    name: projectData.name,
    description: projectData.description,
    link: projectData.link,
    date: projectData.date,
    imgLink: projectData.imgLink,
    techUsed: projectData.techUsed,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`, // Add the authorization header with the token
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Added successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to edit a project
export const editProject = async (id, projectData) => {
  const endpoint = `/api/projects/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const data = {
    name: projectData.name,
    description: projectData.description,
    link: projectData.link,
    imgLink: projectData.imgLink,
  };
  console.log(projectData);
  console.log(JSON.stringify(data));

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`, // Add the authorization header with the token
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Edited successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.errors[0].msg || responseData;
    console.log(errorMessage);

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to delete a project
export const deleteProject = async (id) => {
  const endpoint = `/api/projects/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });
  const responseData = await response.json();
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Deleted successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};
