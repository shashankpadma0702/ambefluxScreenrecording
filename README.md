Screen Recorder App
This is a screen recording application that lets you capture your browser tab along with microphone audio. It's perfect for creating tutorials, recording presentations, or saving interesting content you find online.

What You Can Do
Record your current browser tab with voice narration

Preview your recordings before saving them

Download recordings to your computer

Upload recordings to store them on the server

Browse and play back all your previous recordings

How It Works
The app has two main parts:

A frontend React application that handles the recording interface

A backend Node.js server that stores your recordings and manages the database

Setting Up the Application
Backend Setup
First, let's set up the server part of the application:

Open the backend folder in your file explorer

Right-click and choose "Open in Terminal" (or use your preferred method to open a command prompt in that folder)

Install the required packages by typing: npm install

Start the server by typing: npm start

The backend server will now be running on http://localhost:5000

Frontend Setup
Now, let's set up the user interface:

Open the frontend folder in a new terminal or command prompt

Install the required packages by typing: npm install

Create a new file called ".env" in the frontend folder

Inside this file, add the following line: REACT_APP_API_URL=http://localhost:5000/api

Save the file and start the React application by typing: npm start

The application will automatically open in your browser at http://localhost:3000

Using the Application
Once everything is set up, using the app is simple:

Click the "Start Recording" button

The browser will ask for permission to share your screen and use your microphone - allow both

Select which browser tab you want to record

The recording will start automatically - you'll see a timer counting up

When you're finished, click "Stop Recording"

Preview your recording in the player that appears

Choose to either download the recording to your computer or upload it to the server

To view your previously uploaded recordings, click the "My Recordings" tab at the top of the page.

Important Notes
This application works best in Chrome or other Chromium-based browsers

Recordings are limited to 3 minutes maximum

You need to grant screen sharing and microphone permissions for the app to work

The app stores files on your local server - for a production application, you would want to use cloud storage

If You Want to Deploy Online
If you'd like to make this application available on the internet:

The frontend can be deployed to services like Vercel or Netlify, while the backend works well on Render. You would need to:

Build the frontend for production

Upload the built files to your chosen hosting service

Update the API URL to point to your online backend

For the backend, consider using a more robust database like PostgreSQL

Troubleshooting
If you run into any problems:

Make sure both the frontend and backend are running

Check that you're using a supported browser like Chrome

Ensure you've granted the necessary permissions when prompted by your browser

This application is a great starting point for learning about media recording, full-stack development, and file handling in web applications.

Happy recording!