/********************************************************
 * Basic single-page toggling between "pages" & "tabs."
 * This is just an example UI flow (no actual backend).
 ********************************************************/

/**
 * Show the login page, hide landing.
 */
function showLogin() {
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}

/**
 * Mock login: if fields are filled, show the dashboard.
 */
function login() {
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (username && password) {
    // Hide login, show dashboard
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');

    // Display the username in the sidebar
    document.getElementById('displayUsername').textContent = username;

    // Reset inputs
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
  } else {
    alert('Please enter both a username and password.');
  }
}

/**
 * Logout: go back to landing page, hide dashboard.
 */
function logout() {
  document.getElementById('dashboardPage').classList.add('hidden');
  document.getElementById('landingPage').classList.remove('hidden');
}

/**
 * Show the specified tab, hide all others, and highlight the active link.
 * @param {string} tabId
 */
function showTab(tabId) {
  // Hide all tab-content elements
  const allTabs = document.querySelectorAll('.tab-content');
  allTabs.forEach(tab => tab.classList.add('hidden'));

  // Remove "active" from all sidebar links
  const allLinks = document.querySelectorAll('.menu-list li a');
  allLinks.forEach(link => link.classList.remove('active'));

  // Show the requested tab
  document.getElementById(tabId).classList.remove('hidden');

  // Mark the link as active
  // We map the tabId back to the link ID. They have a pattern: "tabXYZ" -> "linkXYZ".
  const linkId = 'link' + tabId.replace('tab', '');
  document.getElementById(linkId).classList.add('active');
}
