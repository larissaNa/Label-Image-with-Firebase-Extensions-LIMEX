//menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, { edge: 'right' });
});

auth.onAuthStateChanged(userChanged);

function downloadUserImage() {
  const user = firebase.auth().currentUser;
  if (user) {
    let userId = user.uid;
    const userImagesRef = firestore.collection('imageLabels').where('file', '>=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images`).where('file', '<=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images~`);
    userImagesRef.onSnapshot(processesColletionData);
  } else {
    console.log('Usuário não autenticado.');
  }
}

function processesColletionData(querySnapshot) {
  let lc = document.getElementById('labelsContainer');
  lc.innerHTML = '';
  //limpar a lista
  //para cada documento adicionar um elemento na lista
  querySnapshot.forEach(processesDocument);
}


let selectedLanguage = 'fr';

function mapToList(map) {
  const values = [];
  for (const key in map) {
    if (map.hasOwnProperty(key)) {
      const label = map[key][selectedLanguage] || map[key]['pt'];
      values.push(label);
    }
  }
  return values;
}


//funcao que adiciona um elemento na lista
function processesDocument(doc) {
  let docData = doc.data();
  console.log(mapToList(docData.translatedLabels));
  storage.refFromURL(docData.file).getDownloadURL().then((url) => {
    let elementHTML = buildLabelsInfo(url, mapToList(docData.translatedLabels));
    let lc = document.getElementById('labelsContainer');
    lc.appendChild(elementHTML);
  });
}


function buildLabelsInfo(url, labels) {
  const container = document.createElement('div');
  container.classList.add('card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('card-image', 'col', 's12', 'm5');

  const imgElement = document.createElement('img');
  imgElement.src = url;
  imgElement.alt = 'Imagem';
  imgElement.classList.add('imgElement'); // Adicione esta linha
  imgContainer.appendChild(imgElement);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('card-content', 'col', 's12', 'm7');

  const chipsContainer = document.createElement('div');
  chipsContainer.classList.add('chips');

  labels.forEach(label => {
    const chip = document.createElement('div');
    chip.classList.add('chip'); // Removida a classe 'truncate'
    chip.textContent = label;
    chipsContainer.appendChild(chip);
  });

  contentContainer.appendChild(chipsContainer);

  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(imgContainer);
  row.appendChild(contentContainer);
  container.appendChild(row);

  return container;
}

function logOut() {
  auth.signOut();
}

function userChanged(user) {
  if (user) {
    downloadUserImage();
  } else {
    console.log("Usuário não autenticado. Redirecionando para a página de login...");
    window.location.href = './html/login.html';
  }
}

function chechImageLimit(userId) {
  console.log(`Verificando limite de imagens para o usuário: ${userId}`);

  return firestore.collection('imageLabels')
      .where('file', '>=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images`)
      .where('file', '<=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images~`)
      .get()
      .then((querySnapshot) => {
          console.log(`Quantidade de imagens encontradas: ${querySnapshot.size}`);
          return querySnapshot.size < 10;
      })
      .catch((error) => {
          console.error('Erro ao verificar o limite de imagens:', error);
          return false; // Em caso de erro, retornar false para evitar upload
      });
}

function uploadImage() {
  const fileInput = document.getElementById('image-upload');
  const file = fileInput.files[0];
  if (!file) {
      M.toast({html: 'Nenhuma imagem selecionada.', classes: 'red darken-4'});
      return;
  }
  const user = firebase.auth().currentUser;
  if (user) {
      const userId = user.uid;

      chechImageLimit(userId).then((podeEnviar) => {
          if (!podeEnviar) {
              M.toast({html: 'Você atingiu o limite de 10 imagens.', classes: 'red darken-4'});
              return;
          }

          const loadingModal = M.Modal.getInstance(document.getElementById('loading-modal'));
          loadingModal.open();

          const imageRef = storage.ref(`users/${userId}/images/${file.name}`);

          imageRef.put(file).then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                  firestore.collection('imageLabels').add({ 
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(() => {
                      loadingModal.close();
                      M.toast({html: 'Imagem enviada com sucesso!', classes: 'green darken-1'});
                  }).catch((error) => {
                      loadingModal.close();
                      console.error('Erro ao salvar informações no Firestore:', error);
                      M.toast({html: 'Erro ao salvar informações no Firestore.', classes: 'red darken-4'});
                  });
              }).catch((error) => {
                  loadingModal.close();
                  console.error('Erro ao obter URL da imagem no Firebase Storage:', error);
                  M.toast({html: 'Erro ao obter URL da imagem.', classes: 'red darken-4'});
              });
          }).catch((error) => {
              console.error('Erro ao enviar imagem para o Firebase Storage:', error);
              loadingModal.close();
              M.toast({html: 'Erro ao enviar imagem.', classes: 'red darken-4'});
          });
      }).catch((error) => {
          console.error('Erro ao verificar o limite de imagens:', error);
          M.toast({html: 'Erro ao verificar o limite de imagens.', classes: 'red darken-4'});
      });
  } else {
      console.error('Nenhum usuário autenticado.');
  }
}

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  });

  function displayLabels() {
    if (!labelsDisplayed) {
      labelsDisplayed = true;
      const user = firebase.auth().currentUser;

      if (user) {
        const userId = user.uid; 

        const userImagesRef = firestore.collection('imageLabels').where('file', '>=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images`).where('file', '<=', `gs://uploadimg-fc170.appspot.com/users/${userId}/images~`);
        document.getElementById('labelsContainer').innerHTML = '';

        userImagesRef.onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const imageData = doc.data();

            if (imageData.file.startsWith(`gs://uploadimg-fc170.appspot.com/users/${userId}/images/`)) {
              const imageDiv = document.createElement('div');
              imageDiv.classList.add('image-with-labels');

              const imageElement = document.createElement('img');
              imageElement.alt = 'Imagem';
              imageElement.style.maxWidth = '80%'; 
              imageElement.style.maxHeight = '160px';

              storage.refFromURL(imageData.file).getDownloadURL().then((imageUrl) => {
                imageElement.src = imageUrl; 
              }).catch((error) => {
                console.error('Erro ao obter URL da imagem no Firebase Storage:', error);
                imageElement.alt = 'Erro ao carregar imagem';
              });

              const labelsElement = document.createElement('p');
              if (imageData.translatedLabels) {
                const translatedLabels = Object.values(imageData.translatedLabels).map(obj => obj.pt).join(', ');
                labelsElement.textContent = `Rótulos da imagem: ${translatedLabels}`;
              } else {
                labelsElement.textContent = 'Tradução pendente';
              }
              imageDiv.appendChild(labelsElement);

              document.getElementById('labelsContainer').appendChild(imageDiv);
            }
          });
        });
      } else {
        console.error('Nenhum usuário autenticado.');
      }
    }
  }

