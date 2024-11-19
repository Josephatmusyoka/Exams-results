// app/static/js/admin.js

// Function to toggle user status (Active/Inactive)
function toggleUserStatus(userId) {
    fetch(`/admin/toggle_status/${userId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('User status updated successfully!');
        } else {
            alert('Failed to update user status.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to delete a user (from the user list)
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/admin/delete_user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User deleted successfully!');
                document.getElementById(`user-${userId}`).remove();  // Remove the user row
            } else {
                alert('Failed to delete user.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Function to filter reports by date range
function filterReportsByDate(startDate, endDate) {
    fetch(`/admin/reports?start=${startDate}&end=${endDate}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the filtered data
        displayFilteredReports(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayFilteredReports(data) {
    // Update the report table or display section with the filtered data
    let reportTable = document.getElementById('report-table');
    reportTable.innerHTML = '';  // Clear existing data

    data.reports.forEach(report => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.date}</td>
            <td>${report.sales}</td>
            <td>${report.profit}</td>
        `;
        reportTable.appendChild(row);
    });
}
