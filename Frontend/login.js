// login.js
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   try {
       const response = await axios.post('http://localhost:3300/login', { nama: username, password });
       console.log(response);

       if (response.data.message.startsWith('Login successful')) {
           const userRole = response.data.user_role;

           if (userRole === 'Admin') {
               window.location.href = '/page2.html';
           } else if (userRole === 'User') {
               window.location.href = '/page.html';
           } else {
               console.error('Invalid user role');
           }
       } else {
           console.error(response.data.message);
       }
   } catch (error) {
       console.error(error);
   }
});
