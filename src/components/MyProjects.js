import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/styles/index.css';
import { getAllProjects } from '../services/projectsApi';
import { deleteProject } from '../services/projectsApi';
import { editProject } from '../services/projectsApi';

function MyProjects() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    async function viewProjects() {
      // Sample data for dynamic cards (Replace this with your actual data)
      const fetchedCardsData = await getAllProjects();
      setCardsData(fetchedCardsData);

      if (fetchedCardsData.length === 0) {
        // Handle the case where cardsData is empty (e.g., display a message)
        console.log('No projects found.');
        return;
      }
      const card0 = document.querySelector('.c0');
      const prevButton = document.getElementById('nextButton');
      const nextButton = document.getElementById('prevButton');
      const delBtn = document.getElementById('delButton');
      const editBtn = document.getElementById('editButton');
      const viewButton = document.getElementById('projectLinkButton');
      const projectDescriptionElement =
        document.getElementById('projectDescription');
      let currentIndex = 0;
      // Populate the form data with the current card's values
      const currentCardData = cardsData[currentIndex];
      function updateCard() {
        const currentCardData = cardsData[currentIndex];
        card0.innerHTML = `
          <div class="cardImg"><img src="${currentCardData.imgLink}" alt="${currentCardData.title}" loading="lazy"></div>
          <h3>${currentCardData.name}</h3>
        `;
        projectDescriptionElement.innerHTML = `
          <p>${currentCardData.description}</p>
        `;
        viewButton.setAttribute('href', currentCardData.link);
      }

      // Update card and description when navigating through cards
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
        updateCard();
      });

      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cardsData.length;
        updateCard();
      });

      // Initialize the card
      updateCard();

      // Open project link in a new tab
      viewButton.addEventListener('click', () => {
        window.open(viewButton.getAttribute('href'), '_blank');
      });

      //delelte button
      delBtn.addEventListener('click', () => {
        deleteProject(cardsData[currentIndex]._id);
      });
      // Edit button
      editBtn.addEventListener('click', () => {
        // Show SweetAlert2 modal with the edit form
        Swal.fire({
          title: 'Edit Project',
          html: createForm(),
          confirmButtonColor: '#8bf349',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
        }).then((result) => {
          if (result.isConfirmed) {
            // Get the form values
            const editedFormData = {
              name: document.getElementById('name').value,
              description: document.getElementById('description').value,
              link: document.getElementById('Link').value,
              imgLink: document.getElementById('imgLink').value,
            };
            editProject(cardsData[currentIndex]._id, editedFormData);
          }
        });
      });

      const createForm = () => {
        return `
    <form id="editForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value="${currentCardData.name}" required><br>
      <label for="description">Description:</label>
      <textarea id="description" name="description" required>${currentCardData.description}</textarea><br>
      <label for="imgLink">Image Link:</label>
      <input type="text" id="imgLink" name="imgLink" value="${currentCardData.imgLink}"><br>
      <label for="Link">Link:</label>
      <input type="text" id="Link" name="Link" value="${currentCardData.link}" required><br>
    </form>
  `;
      };
    }

    viewProjects();
  }, []);
  if (cardsData.length === 0) {
    return (
      <div id="section-3">
        <div className="no-projects-found">
          <p>No projects found.</p>
        </div>
      </div>
    );
  }
  return (
    <div id="section-3">
      <div className="Sec3container">
        <div className="card c0"></div>
        <div className="card c1"></div>
        <div className="card c2"></div>
      </div>
      <div className="project-description" id="projectDescription"></div>
      <div className="buttons">
        <div id="prevButton">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_116_456)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8953 22.8552C13.4037 22.363 13.1276 21.6958 13.1276 21.0002C13.1276 20.3045 13.4037 19.6373 13.8953 19.1452L23.7933 9.24365C24.2858 8.75145 24.9536 8.47502 25.6498 8.47518C26.3461 8.47535 27.0137 8.75209 27.5059 9.24453C27.9981 9.73697 28.2746 10.4048 28.2744 11.101C28.2742 11.7973 27.9975 12.4649 27.5051 12.9572L19.4621 21.0002L27.5051 29.0432C27.9835 29.538 28.2484 30.201 28.2427 30.8892C28.2371 31.5775 27.9613 32.236 27.4748 32.723C26.9884 33.2099 26.3301 33.4863 25.6418 33.4926C24.9536 33.4989 24.2904 33.2346 23.7951 32.7567L13.8936 22.8569L13.8953 22.8552Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_116_456">
                <rect
                  width="42"
                  height="42"
                  fill="white"
                  transform="matrix(-1 0 0 -1 42 42)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div id="delButton">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00033 25.3333C8.00033 26.8 9.20033 28 10.667 28H21.3337C22.8003 28 24.0003 26.8 24.0003 25.3333V12C24.0003 10.5333 22.8003 9.33333 21.3337 9.33333H10.667C9.20033 9.33333 8.00033 10.5333 8.00033 12V25.3333ZM24.0003 5.33333H20.667L19.7203 4.38667C19.4803 4.14667 19.1337 4 18.787 4H13.2137C12.867 4 12.5203 4.14667 12.2803 4.38667L11.3337 5.33333H8.00033C7.26699 5.33333 6.66699 5.93333 6.66699 6.66667C6.66699 7.4 7.26699 8 8.00033 8H24.0003C24.7337 8 25.3337 7.4 25.3337 6.66667C25.3337 5.93333 24.7337 5.33333 24.0003 5.33333Z"
              fill="white"
            />
          </svg>
        </div>
        <div id="projectLinkButton">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
              fill="white"
            />
            <path
              d="M30.9396 15.66C29.7634 12.6176 27.7216 9.98662 25.0664 8.09209C22.4112 6.19756 19.2591 5.12257 15.9996 5C12.7401 5.12257 9.58796 6.19756 6.93278 8.09209C4.27759 9.98662 2.23574 12.6176 1.05957 15.66C0.980142 15.8797 0.980142 16.1203 1.05957 16.34C2.23574 19.3824 4.27759 22.0134 6.93278 23.9079C9.58796 25.8024 12.7401 26.8774 15.9996 27C19.2591 26.8774 22.4112 25.8024 25.0664 23.9079C27.7216 22.0134 29.7634 19.3824 30.9396 16.34C31.019 16.1203 31.019 15.8797 30.9396 15.66ZM15.9996 22.5C14.714 22.5 13.4573 22.1188 12.3884 21.4046C11.3194 20.6903 10.4863 19.6752 9.99436 18.4874C9.50239 17.2997 9.37367 15.9928 9.62447 14.7319C9.87527 13.471 10.4943 12.3128 11.4034 11.4038C12.3124 10.4948 13.4706 9.8757 14.7315 9.6249C15.9924 9.37409 17.2993 9.50281 18.487 9.99478C19.6747 10.4868 20.6899 11.3199 21.4041 12.3888C22.1184 13.4577 22.4996 14.7144 22.4996 16C22.4969 17.7231 21.8113 19.3749 20.5928 20.5933C19.3744 21.8117 17.7227 22.4974 15.9996 22.5Z"
              fill="white"
            />
          </svg>
        </div>
        <div id="editButton">
          <svg
            width="36"
            height="32"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_301_225)">
              <path
                d="M25.1625 5.19998L30.8 10.8375C31.0375 11.075 31.0375 11.4625 30.8 11.7L17.15 25.35L11.35 25.9937C10.575 26.0812 9.91875 25.425 10.0063 24.65L10.65 18.85L24.3 5.19998C24.5375 4.96248 24.925 4.96248 25.1625 5.19998ZM35.2875 3.76873L32.2375 0.718726C31.2875 -0.231274 29.7437 -0.231274 28.7875 0.718726L26.575 2.93123C26.3375 3.16873 26.3375 3.55623 26.575 3.79373L32.2125 9.43122C32.45 9.66873 32.8375 9.66873 33.075 9.43122L35.2875 7.21873C36.2375 6.26248 36.2375 4.71873 35.2875 3.76873ZM24 21.6375V28H4V7.99998H18.3625C18.5625 7.99998 18.75 7.91873 18.8937 7.78123L21.3937 5.28123C21.8687 4.80623 21.5312 3.99998 20.8625 3.99998H3C1.34375 3.99998 0 5.34373 0 6.99998V29C0 30.6562 1.34375 32 3 32H25C26.6562 32 28 30.6562 28 29V19.1375C28 18.4687 27.1938 18.1375 26.7188 18.6062L24.2188 21.1062C24.0812 21.25 24 21.4375 24 21.6375Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_301_225">
                <rect width="36" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div id="nextButton">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_116_451)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.1047 19.1448C28.5963 19.637 28.8724 20.3042 28.8724 20.9998C28.8724 21.6955 28.5963 22.3627 28.1047 22.8548L18.2067 32.7563C17.7142 33.2486 17.0464 33.525 16.3502 33.5248C15.6539 33.5247 14.9863 33.2479 14.4941 32.7555C14.0019 32.263 13.7254 31.5952 13.7256 30.899C13.7258 30.2027 14.0025 29.5351 14.4949 29.0428L22.5379 20.9998L14.4949 12.9568C14.0165 12.462 13.7516 11.799 13.7573 11.1108C13.7629 10.4225 14.0387 9.76397 14.5252 9.27704C15.0116 8.79012 15.6699 8.51374 16.3582 8.50743C17.0464 8.50113 17.7096 8.76541 18.2049 9.24334L28.1064 19.1431L28.1047 19.1448Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_116_451">
                <rect width="42" height="42" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
