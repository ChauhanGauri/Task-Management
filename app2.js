const initialData = {
    users: [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', email: 'admin@example.com',profilePic:'https://media.istockphoto.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=612x612&w=0&k=20&c=kfP1g2712RiaxsDriIxFo363ARlaL2D591s-22CnIo8='},
        { id: 2, username: 'john', password: 'john123', role: 'employee', name: 'John Doe', email: 'john@example.com',profilePic:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'},
        { id: 3, username: 'jane', password: 'jane123', role: 'employee', name: 'Jane Smith', email: 'jane@example.com',profilePic:'https://cdn.prod.website-files.com/64022de562115a8189fe542a/651a82942e9abeceaa8d3d50_Employee-Surveys-Why-They-Are-An-Essential-Tool-For-Your-HR-Team.jpg'},
          {id: 4, username: 'david', password: 'david123', role: 'employee', name: 'David', email: 'david@example.com',profilePic:'https://via.placeholder.com/150?text=david'} 
          
        // Add more users as needed
    ],
    tasks: [
        { id: 1, title: 'Complete Report', dueDate: '2024-10-15', assignedTo: 2, status: 'Pending' },
        { id: 2, title: 'Update Website', dueDate: '2024-10-20', assignedTo: 3, status: 'Pending' },
        { id: 3, title: 'Give presentation', dueDate: '2024-12-20', assignedTo: 4, status: 'Pending' }
        // Add more tasks as needed
    ],
    
};

// Initialize Data in localStorage if not present
if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(initialData));
}
function getTaskStatistics() {
    const data = getData();
    const tasks = data.tasks;
    const completed = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
    const pending = tasks.filter(task => task.status.toLowerCase() === 'pending').length;
    return { completed, pending };
}

// Function to get individual employee task statistics
function getEmployeeTaskStatistics() {
    const currentUser = getCurrentUser();
    const data = getData();
    const tasks = data.tasks.filter(task => task.assignedTo === currentUser.id);
    const completed = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
    const pending = tasks.filter(task => task.status.toLowerCase() === 'pending').length;
    return { completed, pending };
}

// Function to initialize/update the Admin Dashboard chart
let adminChart; // Global variable to hold the chart instance

function renderAdminChart() {
    const ctx = document.getElementById('taskOverviewChart').getContext('2d');
    const stats = getTaskStatistics();

    if (adminChart) {
        // If chart already exists, update its data
        adminChart.data.datasets[0].data = [stats.completed, stats.pending];
        adminChart.update();
    } else {
        // Create a new chart
        adminChart = new Chart(ctx, {
            type: 'pie', // Change to 'bar', 'doughnut', etc., if desired
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    label: 'Task Status',
                    data: [stats.completed, stats.pending],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)', // Completed - Teal
                        'rgba(255, 99, 132, 0.6)'  // Pending - Red
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Overall Task Status'
                    }
                }
            }
        });
    }
}

// Function to initialize/update the Employee Dashboard chart
let employeeChart; // Global variable to hold the chart instance

function renderEmployeeChart() {
    const ctx = document.getElementById('employeeTaskChart').getContext('2d');
    const stats = getEmployeeTaskStatistics();

    if (employeeChart) {
        // If chart already exists, update its data
        employeeChart.data.datasets[0].data = [stats.completed, stats.pending];
        employeeChart.update();
    } else {
        // Create a new chart
        employeeChart = new Chart(ctx, {
            type: 'pie', // Change to 'bar', 'doughnut', etc., if desired
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    label: 'Your Task Status',
                    data: [stats.completed, stats.pending],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)', // Completed - Blue
                        'rgba(255, 206, 86, 0.6)'  // Pending - Yellow
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Your Task Status'
                    }
                }
            }
        });
    }
}

// Utility Functions
function getData() {
    return JSON.parse(localStorage.getItem('data'));
}

function setData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    sessionStorage.removeItem('currentUser');
}
function generateUserId() {
    const data = getData();
    const ids = data.users.map(user => user.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// DOM Elements
const loginSection = document.getElementById('login-section');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

const signupSection = document.getElementById('signup-section');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const signupBtn = document.getElementById('signup-btn');
const cancelSignupBtn = document.getElementById('cancel-signup-btn');
const signupError = document.getElementById('signup-error');
const navbar = document.getElementById('navbar');
const navDashboard = document.getElementById('nav-dashboard');
const navProfile = document.getElementById('nav-profile');
const navLogout = document.getElementById('nav-logout');

const employeeDashboard = document.getElementById('employee-dashboard');
const adminDashboard = document.getElementById('admin-dashboard');
const profileSection = document.getElementById('profile-section');

// Login Handler
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
    signupError.style.display = 'none';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    signupError.style.display = 'none';
});

cancelSignupBtn.addEventListener('click', () => {
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    signupError.style.display = 'none';
});
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const role = document.getElementById('signup-role').value;

    // Input Validation
    if (!username || !password || !confirmPassword || !name || !email) {
        signupError.textContent = 'Please fill in all fields.';
        signupError.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        signupError.textContent = 'Passwords do not match.';
        signupError.style.display = 'block';
        return;
    }

    // Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        signupError.textContent = 'Please enter a valid email address.';
        signupError.style.display = 'block';
        return;
    }

    const data = getData();

    // Check for Existing Username
    const userExists = data.users.some(user => user.username.toLowerCase() === username.toLowerCase());

    if (userExists) {
        signupError.textContent = 'Username already exists. Please choose another.';
        signupError.style.display = 'block';
        return;
    }

    // Create New User Object
    const newUser = {
        id: generateUserId(),
        username,
        password, // Note: Storing passwords in plaintext is insecure. Consider hashing.
        role,
        name,
        email,
        profilePic: 'https://via.placeholder.com/150?text=User' // Default Profile Picture
    };

    // Add New User to users Array
    data.users.push(newUser);
    setData(data);

    // Clear Form Fields
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm-password').value = '';
    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-role').value = 'employee';

    // Hide Sign-Up Form and Show Login
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    signupError.style.display = 'none';

    alert('Sign-Up successful! You can now log in with your credentials.');
});


loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    const data = getData();
    const user = data.users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        setCurrentUser(user);
        loginSection.classList.add('hidden');
        navbar.classList.remove('hidden');
        if (user.role === 'admin') {
            showAdminDashboard();
        } else {
            showEmployeeDashboard();
        }
    } else {
        loginError.style.display = 'block';
    }
});


// Navigation Handlers
navDashboard.addEventListener('click', () => {
    const user = getCurrentUser();
    if (user.role === 'admin') {
        showAdminDashboard();
    } else {
        showEmployeeDashboard();
    }
});

navProfile.addEventListener('click', () => {
    showProfile();
});

navLogout.addEventListener('click', () => {
    clearCurrentUser();
    navbar.classList.add('hidden');
    employeeDashboard.classList.add('hidden');
    adminDashboard.classList.add('hidden');
    profileSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    document.body.classList.remove('admin-active', 'employee-active');
});

// Show Employee Dashboard
function showEmployeeDashboard() {
    employeeDashboard.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
    profileSection.classList.add('hidden');
    populateEmployeeTasks();
    renderEmployeeChart(); // Render Employee Chart
    document.body.classList.add('employee-active');
    document.body.classList.remove('admin-active');
}

// Show Admin Dashboard
function showAdminDashboard() {
    adminDashboard.classList.remove('hidden');
    employeeDashboard.classList.add('hidden');
    profileSection.classList.add('hidden');
    populateAdminTasks();
    populateEmployeeList();
    populateTaskAssignOptions();
    renderAdminChart(); // Render Admin Chart
    document.body.classList.add('admin-active');
    document.body.classList.remove('employee-active');
}

// Show Profile
function showProfile(userId = null) {
    profileSection.classList.remove('hidden');
    employeeDashboard.classList.add('hidden');
    adminDashboard.classList.add('hidden');
    const profilePic = document.getElementById('profile-pic');
    const data = getData();
    const currentUser = getCurrentUser();
    let user;

    if (userId) {
        user = data.users.find(u => u.id === userId);

    } else {
        user = currentUser;
    }

    if (user) {
        // Set Profile Picture
        profilePic.src = user.profilePic || 'https://via.placeholder.com/150?text=No+Image';
        profilePic.alt = `${user.name}'s Profile Picture`;

        // Set Profile Details
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-role').textContent = capitalizeFirstLetter(user.role);
    }

    // Remove both admin-active and employee-active classes when viewing profile
    
}

// Populate Employee Tasks
// Populate Employee Tasks
function populateEmployeeTasks() {
    const user = getCurrentUser();
    const data = getData();
    const tasks = data.tasks.filter(t => t.assignedTo === user.id && t.status.toLowerCase() === 'pending');
    const tbody = document.querySelector('#employee-tasks-table tbody');
    tbody.innerHTML = '';

    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">No pending tasks.</td></tr>';
        return;
    }

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.dueDate}</td>
            <td><button class="btn btn-complete" data-id="${task.id}">Mark as Completed</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Add Event Listeners for Complete Buttons
    document.querySelectorAll('.btn-complete').forEach(btn => {
        btn.addEventListener('click', markTaskAsCompleted);
    });

    renderEmployeeChart(); // Update Employee Chart
}


// Mark Task as Completed
        // Mark Task as Completed
        function markTaskAsCompleted(e) {
            const taskId = parseInt(e.target.getAttribute('data-id'));
            const data = getData();
            const task = data.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = 'Completed';
                setData(data);
                populateEmployeeTasks();
                populateAdminTasks(); // Refresh Admin Tasks
                renderAdminChart();   // Update Admin Chart
                // If needed, update Employee Chart as well
                const currentUser = getCurrentUser();
                if (currentUser.role === 'employee') {
                    renderEmployeeChart();
                }
            }
        }

// Populate Admin Tasks
function populateAdminTasks() {
    const data = getData();
    const tasks = data.tasks;
    const tbody = document.querySelector('#admin-tasks-table tbody');
    tbody.innerHTML = '';

    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No tasks assigned.</td></tr>';
        return;
    }

    tasks.forEach(task => {
        const assignedUser = data.users.find(u => u.id === task.assignedTo);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.dueDate}</td>
            <td><span class="employee-name" data-id="${assignedUser.id}" style="color:blue; text-decoration:underline; cursor:pointer;">${assignedUser.name}</span></td>
            <td>${task.status}</td>
        `;
        tbody.appendChild(tr);
    });

    // Add Event Listeners for Employee Names
    document.querySelectorAll('.employee-name').forEach(name => {
        name.addEventListener('click', () => {
            const userId = parseInt(name.getAttribute('data-id'));
            showProfile(userId);
        });
    });

    renderAdminChart(); // Update Admin Chart
}

// Populate Employee List in Admin Dashboard
function populateEmployeeList() {
    const data = getData();
    const employees = data.users.filter(u => u.role === 'employee');
    const ul = document.getElementById('employee-list');
    ul.innerHTML = '';

    if (employees.length === 0) {
        ul.innerHTML = '<li>No employees found.</li>';
        return;
    }

    employees.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = emp.name;
        li.setAttribute('data-id', emp.id);
        li.addEventListener('click', () => {
            showProfile(emp.id);
        });
        ul.appendChild(li);
    });
}

// Populate Task Assign Options
function populateTaskAssignOptions() {
    const data = getData();
    const employees = data.users.filter(u => u.role === 'employee');
    const select = document.getElementById('task-assign-to');
    select.innerHTML = '';

    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = emp.name;
        select.appendChild(option);
    });
}

// Add Task Button Handler
const addTaskBtn = document.getElementById('add-task-btn');
const addTaskForm = document.getElementById('add-task-form');
const submitTaskBtn = document.getElementById('submit-task-btn');
const cancelTaskBtn = document.getElementById('cancel-task-btn');

addTaskBtn.addEventListener('click', () => {
    addTaskForm.classList.remove('hidden');
});

cancelTaskBtn.addEventListener('click', () => {
    addTaskForm.classList.add('hidden');
});

// Submit Task Handler
submitTaskBtn.addEventListener('click', () => {
    const title = document.getElementById('task-title').value.trim();
    const dueDate = document.getElementById('task-due-date').value;
    const assignedTo = parseInt(document.getElementById('task-assign-to').value);

    if (title === '' || dueDate === '') {
        alert('Please fill in all fields.');
        return;
    }

    const data = getData();
    const newTask = {
        id: data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1,
        title,
        dueDate,
        assignedTo,
        status: 'Pending'
    };
    data.tasks.push(newTask);
    setData(data);
    addTaskForm.classList.add('hidden');
    // Clear Form
    document.getElementById('task-title').value = '';
    document.getElementById('task-due-date').value = '';
    document.getElementById('task-assign-to').selectedIndex = 0;
    // Refresh Admin Tasks
    populateAdminTasks();
    renderAdminChart(); // Update Admin Chart
});

// Initialize App on Load
window.onload = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        loginSection.classList.add('hidden');
        navbar.classList.remove('hidden');
        if (currentUser.role === 'admin') {
            showAdminDashboard();
        } else {
            showEmployeeDashboard();
        }
    }
};
const clearTasksBtn = document.getElementById('clear-tasks-btn');

clearTasksBtn.addEventListener('click', clearAllTasks);

// Function to Clear All Tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks? This action cannot be undone.")) {
        const data = getData();
        data.tasks = []; // Clear the tasks array
        setData(data); // Update localStorage
        populateAdminTasks(); // Refresh the admin tasks table
        renderAdminChart(); // Update Admin Chart
        alert("All tasks have been cleared.");
    }
}