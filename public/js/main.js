async function fetchRequests() {
    try {
        const response = await fetch('/requests');
        const requests = await response.json();

        const container = document.getElementById('requests-container');
        container.innerHTML = ''; // this helps clear the container

        requests.forEach((request) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <h3>${request.title}</h3>
            <p>${request.description}</p>
            <p><strong>Location:</strong> ${request.location}</p>
            <p><strong>Status:</strong> ${request.status}</p>
            <a href="/requests/${request._id}">View Details</a>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

fetchRequests();