# Label-Image-with-Firebase-Extensions-LIMEX

This project is a web application developed with **Firebase**, **HTML**, **CSS**, **JavaScript**, **Flask**, and **Bootstrap**. The application allows users to authenticate using Firebase Authentication, and includes features like image upload, automatic image labeling with the Google Cloud Vision API, and text translation using the Google Cloud Translation API.

## Features

- **Firebase Authentication**: Login with email and password, as well as Google login.
- **Image Labeling with Google Cloud Vision API**: Users can upload images to Firebase Storage, and the images are automatically analyzed by the Google Cloud Vision API. Labels generated from the images are stored in Firestore.
- **Text Translation with Google Cloud Translation API**: Labels stored in Firestore are automatically translated into multiple languages using the Google Cloud Translation API.

## Technologies Used

- **Firebase**: 
  - **Firebase Authentication** for user authentication (email/password and Google login).
  - **Firebase Firestore** for storing image labels and translated text.
  - **Firebase Storage** for storing user images.
  
- **HTML** / **CSS** / **JavaScript**: For building the frontend user interface.
  
- **Flask**: Python-based web framework used for backend processing.
  
- **Bootstrap**: Frontend framework for creating a responsive and modern user interface.

- **Google Cloud Vision API**: Used for analyzing images and generating labels describing the content.
  
- **Google Cloud Translation API**: Used for translating labels and text to multiple languages.

## Getting Started

### Prerequisites

Before running the project, you need to install the following dependencies:

1. [Install Node.js](https://nodejs.org/) (which includes npm).
2. [Install Firebase CLI](https://firebase.google.com/docs/cli).
3. [Install Python](https://www.python.org/downloads/) and **Flask**:

    ```bash
    pip install Flask
    ```

4. [Google Cloud API Keys](https://cloud.google.com/docs/authentication/getting-started) for the Google Cloud Vision API and Google Cloud Translation API.

### Setup Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/repository-name.git
    cd repository-name
    ```

2. **Install Firebase CLI tools**:

    ```bash
    npm install -g firebase-tools
    ```

3. **Login to Firebase**:

    ```bash
    firebase login
    ```

4. **Initialize Firebase in your project**:

    ```bash
    firebase init
    ```

5. **Configure Firebase Storage and Firestore** in the [Firebase Console](https://console.firebase.google.com/).

6. **Get Firebase project credentials** from the Firebase Console and add them to the project’s configuration file.

7. **Run the application**:

    For the backend (Flask), run:

    ```bash
    python app.py
    ```

    For the frontend, simply open the `index.html` file in your browser or configure a local development server.

## Project Structure

- **public/**: Public assets and files for the frontend.
- **src/**: The source code for the application.
- **firebaseInit.js**: Firebase configuration code.
- **app.py**: Flask-based backend code.
- **package.json**: Project dependencies (if applicable).
  
## How to Contribute

1. Fork this repository.
2. Create a branch for your feature (`git checkout -b my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin my-feature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

Developed by [Your Name], in collaboration with **Mª Isabelly**, **Luis Guilherme**, and **Iallen Gábio**.

