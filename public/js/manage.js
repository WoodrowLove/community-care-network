// Fetch and display user's offers and requests
async function fetchAndDisplay() {
    try {
      // Fetch offers and requests
      const requestsResponse = await fetch('/requests/user');
      const requests = await requestsResponse.json();
  
      // Display requests
      const requestsContainer = document.getElementById('requests-container');
      requestsContainer.innerHTML = ''; // Clear existing content
  
      // Loop through each request and create a card
      requests.forEach((request) => {
        const card = createCard(request, 'request');
        requestsContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }
  
  // Create a card element for a request
  function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';
  
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Status:</strong> ${item.status}</p>
    `;
  
    // Add complete and delete buttons
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Mark as Complete';
    completeBtn.onclick = () => markAsComplete(item._id, type);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteItem(item._id, type);
  
    card.appendChild(completeBtn);
    card.appendChild(deleteBtn);
  
    return card;
  }
  
  // Mark a request as complete
  async function markAsComplete(id, type) {
    try {
      const response = await fetch(`/${type}s/${id}/complete`, { method: 'PUT' });
      if (response.ok) {
        fetchAndDisplay();  // Refresh the list
      } else {
        console.error(`Error marking ${type} as complete:`, await response.json());
      }
    } catch (error) {
      console.error(`Error marking ${type} as complete:`, error);
    }
  }
  
  // Delete a request
  async function deleteItem(id, type) {
    try {
      const response = await fetch(`/${type}s/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchAndDisplay();  // Refresh the list
      } else {
        console.error(`Error deleting ${type}:`, await response.json());
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  }
  
  // Initial fetch and display
  fetchAndDisplay();