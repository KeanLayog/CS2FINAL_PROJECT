document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const profilePage = document.getElementById('profilefname');

        if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
                const formData = {
                firstName: document.getElementById('first-name').value.trim(),
                lastName: document.getElementById('last-name').value.trim(),
                sex: document.querySelector('input[name="sex"]:checked')?.value || '',
                email: document.getElementById('email').value.trim(),
                reason: document.getElementById('reason').value.trim()
            };

                if (!formData.firstName || !formData.lastName || !formData.sex || !formData.email || !formData.reason) {
                alert('Please fill all required fields!');
                return;
            }
            localStorage.setItem('userProfile', JSON.stringify(formData));
            window.location.href = 'PROFILE.html';
        });
    }
	if (profilePage) {
        const savedData = JSON.parse(localStorage.getItem('userProfile'));
        if (savedData) {
            document.getElementById('profilefname').textContent = savedData.firstName;
            document.getElementById('profilelname').textContent = savedData.lastName;
            document.getElementById('profilesex').textContent = savedData.sex;
            document.getElementById('profileemail').textContent = savedData.email;
            document.getElementById('profilereason').textContent = savedData.reason;
        } else {
            document.querySelector('.profileinfo').innerHTML = '<p>No profile data found. <a href="SIGNUP.html">Sign up first</a></p>';
        }
    }

        const notYouLink = document.getElementById('not-you');
   	 if (notYouLink) {
        notYouLink.addEventListener('click', () => {
            localStorage.removeItem('userProfile');
        });
    }
});