import { LocalStorageSingleton } from './LocalStorageSingleton.js';

// --- STATE MANAGEMENT ---
const storage = new LocalStorageSingleton();

let users = storage.obtenerUsuarios();
let currentUser = storage.obtenerUsuarioActual();

// --- DOM ELEMENTS ---
// Common
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Dashboard
const dashboardBody = document.querySelector('.dashboard-body');
const userGreeting = document.getElementById('user-greeting');
const btnLogout = document.getElementById('btn-logout');
const btnEditProfile = document.getElementById('btn-edit-profile');
const sidebar = document.getElementById('sidebar');
const friendsList = document.getElementById('friends-list');
const friendRequestsList = document.getElementById('friend-requests-list');
const usersGrid = document.getElementById('users-grid');
const sectionTitle = document.getElementById('section-title');

// Modal
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('register.html')) {
        initRegister();
    } else if (path.includes('login.html')) {
        initLogin();
    } else if (path.includes('dashboard.html')) {
        initDashboard();
    }
});

// --- AUTHENTICATION LOGIC ---

function initRegister() {
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const dob = document.getElementById('reg-dob').value;
            const age = document.getElementById('reg-age').value;
            const role = document.getElementById('reg-role').value;

            if (users.find(u => u.username === username)) {
                alert('El nombre de usuario ya existe.');
                return;
            }

            const newUser = {
                username,
                email,
                password,
                dob,
                age,
                role,
                friends: [],
                friendRequests: []
            };

            users.push(newUser);
            saveUsers();
            
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
    }
}

function initLogin() {
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                currentUser = user;
                storage.guardarUsuarioActual(currentUser);
                window.location.href = 'dashboard.html';
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    }
}

function logout() {
    currentUser = null;
    storage.eliminarUsuarioActual();
    window.location.href = 'login.html';
}

// --- DASHBOARD LOGIC ---

function initDashboard() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Setup Header
    userGreeting.textContent = `Hola, ${currentUser.username} (${currentUser.role})`;
    btnLogout.addEventListener('click', logout);

    // Setup Role-based View
    if (currentUser.role === 'user') {
        setupUserView();
    } else if (currentUser.role === 'admin') {
        setupAdminView();
    }

    // Setup Modal
    btnCancelEdit.addEventListener('click', closeEditModal);
    editForm.addEventListener('submit', handleEditSubmit);
    
    // Initial Render
    renderUsersGrid();
}

function setupUserView() {
    sidebar.classList.remove('hidden');
    btnEditProfile.classList.remove('hidden');
    btnEditProfile.addEventListener('click', () => openEditModal(currentUser));
    
    renderFriendsList();
    renderFriendRequests();
}

function setupAdminView() {
    sidebar.classList.add('hidden');
    btnEditProfile.classList.add('hidden');
    sectionTitle.textContent = 'Administración de Usuarios';
}

// --- RENDERING ---

function renderUsersGrid() {
    DOMBuilder.limpiarContenedor(usersGrid);

    users.forEach(user => {
        // Don't show self in grid
        if (user.username === currentUser.username) return;

        const card = DOMBuilder.crearElemento('div', 'user-card');

        const initial = user.username.charAt(0).toUpperCase();
        
        // Avatar
        const avatar = DOMBuilder.crearElemento('div', 'avatar', initial);
        card.appendChild(avatar);

        // User Info
        const userInfo = DOMBuilder.crearElemento('div', 'user-info');
        userInfo.appendChild(DOMBuilder.crearElemento('h3', [], user.username));
        userInfo.appendChild(DOMBuilder.crearElemento('span', 'user-role', user.role));
        
        const emailP = DOMBuilder.crearElemento('p', [], user.email);
        emailP.style.fontSize = '0.8rem';
        emailP.style.color = 'var(--text-secondary)';
        emailP.style.marginBottom = '0.5rem';
        userInfo.appendChild(emailP);

        const ageP = DOMBuilder.crearElemento('p', [], `Edad: ${user.age}`);
        ageP.style.fontSize = '0.8rem';
        ageP.style.color = 'var(--text-secondary)';
        userInfo.appendChild(ageP);

        card.appendChild(userInfo);

        // Actions
        const actions = DOMBuilder.crearElemento('div', 'card-actions');
        
        if (currentUser.role === 'admin') {
            const btnEdit = DOMBuilder.crearElemento('button', ['btn-sm', 'btn-edit'], 'Editar');
            btnEdit.onclick = () => openEditModalByUsername(user.username);
            
            const btnDelete = DOMBuilder.crearElemento('button', ['btn-sm', 'btn-delete'], 'Eliminar');
            btnDelete.onclick = () => deleteUser(user.username);

            actions.appendChild(btnEdit);
            actions.appendChild(btnDelete);
        } else {
            // User Role Logic
            const isFriend = currentUser.friends.includes(user.username);
            const hasSentRequest = user.friendRequests.includes(currentUser.username);
            const hasReceivedRequest = currentUser.friendRequests.includes(user.username);

            if (isFriend) {
                const span = DOMBuilder.crearElemento('span', [], 'Amigo');
                span.style.color = 'var(--success)';
                span.style.fontSize = '0.8rem';
                actions.appendChild(span);
            } else if (hasSentRequest) {
                const span = DOMBuilder.crearElemento('span', [], 'Solicitud enviada');
                span.style.color = 'var(--text-secondary)';
                span.style.fontSize = '0.8rem';
                actions.appendChild(span);
            } else if (hasReceivedRequest) {
                const btnAccept = DOMBuilder.crearElemento('button', ['btn-sm', 'btn-accept'], 'Aceptar Solicitud');
                btnAccept.onclick = () => acceptFriendRequest(user.username);
                actions.appendChild(btnAccept);
            } else {
                const btnAdd = DOMBuilder.crearElemento('button', ['btn-sm', 'btn-add-friend'], 'Agregar Amigo');
                btnAdd.onclick = () => sendFriendRequest(user.username);
                actions.appendChild(btnAdd);
            }
        }

        card.appendChild(actions);
        usersGrid.appendChild(card);
    });
}

function renderFriendsList() {
    DOMBuilder.limpiarContenedor(friendsList);
    
    if (currentUser.friends.length === 0) {
        const p = DOMBuilder.crearElemento('p', [], 'No tienes amigos aún.');
        p.style.color = 'var(--text-secondary)';
        p.style.fontSize = '0.9rem';
        friendsList.appendChild(p);
        return;
    }

    currentUser.friends.forEach(friendName => {
        const item = DOMBuilder.crearElemento('div', 'friend-item');
        
        const avatar = DOMBuilder.crearElemento('div', 'friend-avatar', friendName.charAt(0).toUpperCase());
        const name = DOMBuilder.crearElemento('span', [], friendName);
        
        item.appendChild(avatar);
        item.appendChild(name);
        
        friendsList.appendChild(item);
    });
}

function renderFriendRequests() {
    DOMBuilder.limpiarContenedor(friendRequestsList);

    if (currentUser.friendRequests.length === 0) {
        const p = DOMBuilder.crearElemento('p', [], 'Sin solicitudes.');
        p.style.color = 'var(--text-secondary)';
        p.style.fontSize = '0.9rem';
        friendRequestsList.appendChild(p);
        return;
    }

    currentUser.friendRequests.forEach(senderName => {
        const item = DOMBuilder.crearElemento('div', 'friend-item');
        item.style.justifyContent = 'space-between';

        const infoDiv = DOMBuilder.crearElemento('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.alignItems = 'center';

        const avatar = DOMBuilder.crearElemento('div', 'friend-avatar', senderName.charAt(0).toUpperCase());
        const name = DOMBuilder.crearElemento('span', [], senderName);
        
        infoDiv.appendChild(avatar);
        infoDiv.appendChild(name);

        const btnAccept = DOMBuilder.crearElemento('button', ['btn-sm', 'btn-accept'], '✓');
        btnAccept.onclick = () => acceptFriendRequest(senderName);

        item.appendChild(infoDiv);
        item.appendChild(btnAccept);

        friendRequestsList.appendChild(item);
    });
}

// --- ACTIONS ---

// Expose functions to window for onclick handlers
window.openEditModalByUsername = (username) => {
    const user = users.find(u => u.username === username);
    if (user) openEditModal(user);
};

window.deleteUser = (username) => {
    if (confirm(`¿Estás seguro de eliminar a ${username}?`)) {
        users = users.filter(u => u.username !== username);
        // Also remove from friends lists of others
        users.forEach(u => {
            u.friends = u.friends.filter(f => f !== username);
            u.friendRequests = u.friendRequests.filter(f => f !== username);
        });
        
        saveUsers();
        renderUsersGrid();
    }
};

window.sendFriendRequest = (targetUsername) => {
    const targetUser = users.find(u => u.username === targetUsername);
    if (targetUser) {
        targetUser.friendRequests.push(currentUser.username);
        saveUsers();
        renderUsersGrid(); // Re-render to update button state
        alert(`Solicitud enviada a ${targetUsername}`);
    }
};

window.acceptFriendRequest = (senderUsername) => {
    const senderUser = users.find(u => u.username === senderUsername);
    const me = users.find(u => u.username === currentUser.username); // Get fresh ref

    if (senderUser && me) {
        // Add to friends
        me.friends.push(senderUsername);
        senderUser.friends.push(me.username);

        // Remove from requests
        me.friendRequests = me.friendRequests.filter(req => req !== senderUsername);

        saveUsers();
        
        // Update local currentUser
        currentUser = me;
        storage.guardarUsuarioActual(currentUser);

        renderUsersGrid();
        renderFriendsList();
        renderFriendRequests();
    }
};

// --- EDIT MODAL LOGIC ---

function openEditModal(user) {
    const isSelf = user.username === currentUser.username;
    const isAdmin = currentUser.role === 'admin';

    document.getElementById('edit-original-username').value = user.username;
    
    document.getElementById('edit-username').value = user.username;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-dob').value = user.dob;
    document.getElementById('edit-age').value = user.age;
    document.getElementById('edit-role').value = user.role;

    // Password section logic
    const passSection = document.getElementById('password-change-section');
    if (isSelf) {
        passSection.style.display = 'block';
        document.getElementById('edit-old-password').value = '';
        document.getElementById('edit-new-password').value = '';
        document.getElementById('edit-confirm-password').value = '';
    } else {
        passSection.style.display = 'none';
    }

    // Role field
    document.getElementById('edit-role').disabled = !isAdmin;

    editModal.classList.remove('hidden');
}

function closeEditModal() {
    editModal.classList.add('hidden');
}

function handleEditSubmit(e) {
    e.preventDefault();

    const originalUsername = document.getElementById('edit-original-username').value;
    const newUsername = document.getElementById('edit-username').value;
    const newEmail = document.getElementById('edit-email').value;
    const newDob = document.getElementById('edit-dob').value;
    const newAge = document.getElementById('edit-age').value;
    const newRole = document.getElementById('edit-role').value;

    // Find user index
    const userIndex = users.findIndex(u => u.username === originalUsername);
    if (userIndex === -1) return;

    const userToEdit = users[userIndex];

    // Check username uniqueness if changed
    if (originalUsername !== newUsername) {
        if (users.find(u => u.username === newUsername)) {
            alert('El nuevo nombre de usuario ya está en uso.');
            return;
        }
    }

    // Password Change Logic (Only if visible/self-edit)
    const passSection = document.getElementById('password-change-section');
    if (passSection.style.display !== 'none') {
        const oldPass = document.getElementById('edit-old-password').value;
        const newPass = document.getElementById('edit-new-password').value;
        const confirmPass = document.getElementById('edit-confirm-password').value;

        if (newPass) { // If trying to change password
            if (oldPass !== userToEdit.password) {
                alert('La contraseña actual es incorrecta.');
                return;
            }
            if (newPass !== confirmPass) {
                alert('Las nuevas contraseñas no coinciden.');
                return;
            }
            userToEdit.password = newPass;
        }
    }

    // Update fields
    userToEdit.username = newUsername;
    userToEdit.email = newEmail;
    userToEdit.dob = newDob;
    userToEdit.age = newAge;
    userToEdit.role = newRole;

    // Update currentUser if we edited ourselves
    if (currentUser.username === originalUsername) {
        currentUser = userToEdit;
        storage.guardarUsuarioActual(currentUser);
        userGreeting.textContent = `Hola, ${currentUser.username} (${currentUser.role})`;
    }

    saveUsers();
    
    // Refresh UI
    if (currentUser.role === 'user') {
        renderFriendsList(); // In case name changed
    }
    renderUsersGrid();
    
    closeEditModal();
    alert('Usuario actualizado correctamente.');
}

// --- UTILS ---

function saveUsers() {
    storage.guardarUsuarios(users);
}
