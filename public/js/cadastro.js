function registerWithEmailAndPassword() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Cadastro bem sucedido
        alert("Usuário cadastrado com sucesso! Um e-mail de verificação foi enviado para " + email);
        // Envie o e-mail de verificação
        return userCredential.user.sendEmailVerification();
      })
      .then(function() {
        // Redireciona para a tela principal após cadastrar com sucesso e enviar o e-mail de verificação
        // Remova esse redirecionamento aqui
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Erro ao cadastrar usuário: " + errorMessage);
      });
}

// Verifica se o usuário está autenticado e se o e-mail foi verificado ao carregar a página
firebase.auth().onAuthStateChanged(function(user) {
  if (user && user.emailVerified) {
    // Redireciona para a tela principal se o usuário estiver autenticado e o e-mail estiver verificado
    window.location.href = '../index.html';
  }
});

//menu mobile
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

