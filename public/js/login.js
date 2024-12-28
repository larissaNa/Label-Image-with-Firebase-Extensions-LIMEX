auth.onAuthStateChanged(userChanged);

function loginWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Não foi possível fazer o login.');
        });
}

const provider = new firebase.auth.GoogleAuthProvider();
function loginWithGoogle(){
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        // Autenticação bem-sucedida, você pode acessar os detalhes do usuário em result.user
        const user = result.user;
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });

}

function userChanged(user){
    if (user) {
        console.log("Usuário autenticado:", user);
        window.location.href = '../index.html';
    } else {
        console.log("Usuário não autenticado. Redirecionando para a página de login...");
    }
}

//menu mobile
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
  });




