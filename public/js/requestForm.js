document.getElementById('request-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const time_frame = document.getElementById('time_frame').value;
  
    const requestData = {
      title,
      description,
      location,
      category,
      time_frame,
    };
  
    try {
      const response = await fetch('/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // Redirect to the Manage Screen
        window.location.href = '/manage';
      } else {
        console.error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });