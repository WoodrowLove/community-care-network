// Fetch all help requests and display them on the homepage
async function fetchRequests() {
    try {
      const response = await fetch('/requests');
      const requests = await response.json();
  
      const container = document.getElementById('requests-container');
      container.innerHTML = '';  // Clear the container
  
      requests.forEach((request) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${request.title}</h3>
          <p>${request.description}</p>
          <p><strong>Location:</strong> ${request.location}</p>
          <p><strong>Category:</strong> ${request.category}</p>
          <p><strong>Status:</strong> ${request.status}</p>
          <p><strong>Time Frame:</strong> ${request.time_frame}</p>
        `;
        container.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }
  
  // Call the function when the page loads
  fetchRequests();
