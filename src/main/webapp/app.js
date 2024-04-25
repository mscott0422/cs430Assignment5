// Authors: Mitchell Scott, Boone Losche, Corwin Paulsen


function searchUsers() {
    var searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === "") {
        alert("Please enter a user name to search.");
        return;
    }

    fetch('/assignment5/search?userName=' + searchInput)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displaySearchResult(data);
        })
        .catch(error => console.error('Error:', error));
}

function addUser() {
    var userID = document.getElementById('newUserID').value.trim();
    var userName = document.getElementById('newUserName').value.trim();
    var userType = document.getElementById('newUserType').value.trim();

    if (userID === "" || userName === "" || userType === "") {
        alert("Please enter values for all fields to add a new user.");
        return;
    }

    var userData = {
        userID: userID,
        userName: userName,
        userType: userType
    };

    fetch('/assignment5/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        document.getElementById('addUserResult').textContent = result;
    })
    .catch(error => console.error('Error:', error));
}

function deleteUser() {
    var userId = document.getElementById('deleteUserID').value.trim();

    if (userId === "") {
        alert("Please enter a user ID to delete.");
        return;
    }

    fetch('/assignment5/deleteUser?userId=' + userId, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        document.getElementById('deleteUserResult').textContent = result;
    })
    .catch(error => console.error('Error:', error));
}

function updateUser() {
    var updateID = document.getElementById('oldUserID').value.trim();
    var updateName = document.getElementById('updateUserName').value.trim();
    var updateType = document.getElementById('updateUserType').value.trim();
    if (updateID === "" || updateName === "" || updateType === "") {
        alert("Please enter a user ID to update.");
        return;
    }
    fetch('/assignment5/update?UserID=' + updateID + '&UserName=' + updateName + '&UserType=' + updateType + '',{
        method: 'POST'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
        document.getElementById('updateUserResult').textContent = result;
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResult(users) {
    var searchResultDiv = document.getElementById('searchResult');
    searchResultDiv.innerHTML = "";

    if (users.length === 0) {
        searchResultDiv.textContent = "No users found.";
    } else {
        var userList = document.createElement('ul');
        users.forEach(user => {
            var listItem = document.createElement('li');
            listItem.textContent = user.userName + ' - ' + user.userType; 
            userList.appendChild(listItem);
        });
        searchResultDiv.appendChild(userList);
    }
}


