# Foliage Classifier and Article Summarizer

This project combines image classification and article summarization using TensorFlow/Keras for image prediction and RapidAPI for article summarization. It includes a backend developed with FastAPI and a frontend built with React.js and Redux, with Firebase Firestore for database operations.

## Features

- **Image Classification**: Utilizes a pre-trained TensorFlow/Keras model to classify foliage images into specific classes.
- **Article Summarization**: Integrates with RapidAPI to summarize articles retrieved via URL inputs.
- **Firebase Firestore**: Stores and retrieves data using Firebase Firestore for seamless data management.

## Technologies Used

- **Backend**: FastAPI, TensorFlow/Keras, Firebase Firestore
- **Frontend**: React.js, Redux
- **Database**: Firebase Firestore
- **API Integration**: RapidAPI

## Getting Started

### Installation

1. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Install dependencies: `pip install -r requirements.txt`.
   - Start the FastAPI server: `uvicorn main:app --host 0.0.0.0 --port 8000`.

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies: `npm install` or `yarn install`.
   - Start the React development server: `npm start` or `yarn start`.

3. **Firebase Setup**:
   - Create a Firebase project and set up Firestore database.
   - Obtain Firebase configuration details and update `firebase.jsx` with your Firebase SDK configuration.

4. **Run the Application**:
   - Access the application at `http://localhost:3000` (frontend) and `http://localhost:8000` (backend).

## API Endpoints

- **POST `/predict/`**: Upload an image file to classify foliage.
- **POST `/summarize/`**: Provide a URL to summarize an article.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


