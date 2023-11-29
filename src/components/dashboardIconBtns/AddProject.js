import React, { useEffect } from 'react';
import '../../assets/styles/index.css';
import { createNewProject } from '../../services/projectsApi';
import Swal from 'sweetalert2';

function AddProject() {
  useEffect(() => {
    const createNewProjectBtn = document.querySelector('.addProjectBtn');

    if (createNewProjectBtn) {
      createNewProjectBtn.addEventListener('click', async () => {
        // Show SweetAlert2 modal with the add project form
        let formValues;
        const { value } = await Swal.fire({
          title: 'Add Project',
          html:
            `<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="Name">` +
            `<input autocomplete="off" required type="text" id="swal-input2" class="swal2-input" placeholder="Description">` +
            `<input autocomplete="off" required type="text" id="swal-input3" class="swal2-input" placeholder="Image Link">` +
            `<input autocomplete="off" required type="text" id="swal-input4" class="swal2-input" placeholder="Link">`,
          confirmButtonColor: '#8bf349',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          preConfirm: () => {
            formValues = [
              document.getElementById('swal-input1').value,
              document.getElementById('swal-input2').value,
              document.getElementById('swal-input3').value,
              document.getElementById('swal-input4').value,
            ];

            if (!formValues.every((value) => value)) {
              Swal.showValidationMessage(
                'Please fill in all of the required fields.'
              );
              return false;
            }

            return formValues;
          },
        });

        if (value) {
          // Call the createNewProject function with the new project data
          const projectData = {
            name: formValues[0],
            description: formValues[1],
            imgLink: formValues[2],
            link: formValues[3],
          };
          createNewProject(projectData);
        }
      });
    }
  }, []);
  return (
    <button className="addProjectBtn">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_301_120)">
          <path
            d="M13.9997 26.6667C13.9997 27.1971 14.2104 27.7058 14.5855 28.0809C14.9605 28.456 15.4692 28.6667 15.9997 28.6667C16.5301 28.6667 17.0388 28.456 17.4139 28.0809C17.789 27.7058 17.9997 27.1971 17.9997 26.6667V18H26.6663C27.1968 18 27.7055 17.7893 28.0806 17.4143C28.4556 17.0392 28.6663 16.5305 28.6663 16C28.6663 15.4696 28.4556 14.9609 28.0806 14.5858C27.7055 14.2108 27.1968 14 26.6663 14H17.9997V5.33337C17.9997 4.80294 17.789 4.29423 17.4139 3.91916C17.0388 3.54409 16.5301 3.33337 15.9997 3.33337C15.4692 3.33337 14.9605 3.54409 14.5855 3.91916C14.2104 4.29423 13.9997 4.80294 13.9997 5.33337V14H5.33301C4.80257 14 4.29387 14.2108 3.91879 14.5858C3.54372 14.9609 3.33301 15.4696 3.33301 16C3.33301 16.5305 3.54372 17.0392 3.91879 17.4143C4.29387 17.7893 4.80257 18 5.33301 18H13.9997V26.6667Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_301_120">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default AddProject;
