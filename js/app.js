var app = {
  gridSize: 8, // référence nombre de lignes
  pixelSize: 20, // référence taille pixels
  styles: [
    'default',  
    'dark', 
    'yellow', 
    'blue',
    'red'
  ],
  
  init: function() {
    console.log(`OK.`);

    app.board = document.getElementById('invader'); // récupération de l'ardoise globale
    app.configForm = document.getElementById('configuration'); // récupération du formulaire

    // écouteurs d'évènements
    app.board.addEventListener('click', app.handlePixelClick); 
    app.configForm.addEventListener('submit', app.handleFormSubmit); 

    // on génère les éléments indispensables
    app.createBoard(); 
    app.createForm(); 
    app.createPalette(); 
  },

  // créer la palette
  createPalette: function() {
    app.palette = document.createElement('div'); 
    app.palette.className = "palette"; 

    // on utilise un forEach pour boucler sur le tableau en appelant un callback avec chaque élément passé en argument
    app.styles.forEach(app.addStyleButton); 
    document.body.appendChild(app.palette); 
  }, 

  // ajouter les boutons des styles
  addStyleButton: function(style) {
    let styleButton = document.createElement('button');
    styleButton.className = "palette__color--" + style + " palette__color";

    styleButton.dataset.style = style;

    // un écouteur d'évènement par bouton
    styleButton.addEventListener('click', app.handleStyleClick);
    app.palette.appendChild(styleButton);
  },

  // créer le formulaire
  createForm: function() {
    let gridSizeInput = document.createElement('input');
    gridSizeInput.type = "number";
    gridSizeInput.placeholder = "Taille de la grille";
    gridSizeInput.name = "gridSize";

    let pixelSizeInput = document.createElement('input');
    pixelSizeInput.type = "number";
    pixelSizeInput.placeholder = "Taille des pixels";
    pixelSizeInput.name = "pixelSize";

    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Valider';

    app.configForm.appendChild(gridSizeInput);
    app.configForm.appendChild(pixelSizeInput);
    app.configForm.appendChild(submitButton);
  },

  // créer la grille de dessin
  createBoard: function() {
    // cette boucle se charge de créer les lignes de la grille
    for (let row = 0; row < app.gridSize; row++) {
      // chaque ligne sera contenue dans une div
      let rowElement = document.createElement('div'); 
      rowElement.className = "grid__row"; 
      // on rattache ces lignes au board #invader
      app.board.appendChild(rowElement); 

      // 2ème boucle : elle se charge de créer les pixels de chaque ligne
      for (let pixel = 0; pixel < app.gridSize; pixel++) {
        // chaque pixel sera également contenu dans une div
        let pixelElement = document.createElement('div'); 
        pixelElement.className = "grid__pixel";  
        pixelElement.style.width = app.pixelSize + "px"; 
        pixelElement.style.height = app.pixelSize + "px"; 
 
        // et on rattache ces éléments pixel aux éléments row
        rowElement.appendChild(pixelElement); 
      };
    };
  }, 

  // gère l'envoi de formulaire
  handleFormSubmit: function(event) {
    // empêche l'envoi du formulaire
    event.preventDefault(); 

    // on récupère le formulaire et les éléments dont on veut récupérer la valeur
    let form = event.target; 
    let gridSizeInput = form.children[0];
    let pixelSizeInput = form.children[1];

    let newGridSize = gridSizeInput.value; 
    let newPixelSize = pixelSizeInput.value;

    // effacer la grille actuelle
    app.board.textContent = ""; 

    app.gridSize = parseInt(newGridSize, 10);
    app.pixelSize = parseInt(newPixelSize, 10);

    // redessine la grille
    app.createBoard();
  },

  // changement de couleur des pixels au clic
  handlePixelClick: function(event) { 
    let pixel = event.target; // notre pixel est stocké dans event.target

    // boucle parcourant le tableau des styles
    for (let styleIndex = 0; styleIndex < app.styles.length; styleIndex++) {
      // on retire les styles un par un
      pixel.classList.remove("grid__pixel--" + app.styles[styleIndex]); 
    }; 

    if (app.currentStyle) {
      pixel.classList.add("grid__pixel--" + app.currentStyle); 
    }; 

  },

  // changement de choix de couleur
  handleStyleClick: function(event) {

    let button = event.target; 
    app.currentStyle = button.dataset.style; 
  }
};

// on initialise au chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);