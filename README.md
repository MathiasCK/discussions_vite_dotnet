## Introduction 📝

Welcome to the Discussions App, a platform that allows users to engage in meaningful conversations and share their thoughts and ideas with others. This application is built using .NET Core 7 for the backend and React-ViteJS for the frontend, providing a seamless and interactive user experience.

## Features 🌟

- User Authentication 🔐: Users can sign up and log in using their email. A verification email is sent for account confirmation, ensuring a secure and reliable user base.
- Discussion Creation 🗣️: Users can create discussions on various topics, fostering a community of diverse ideas and interests.
- Discussion Management 📋: Users have the ability to update and delete their own discussions, giving them full control over their content.
- Commenting 💬: For each discussion, users can create comments to express their thoughts, ask questions, or provide feedback.
- Comment Management 🗑️: Users can also delete their own comments, maintaining a sense of ownership and moderation within discussions.

## Prerequisites 📋

Before you get started, make sure you have the following requirements in place:

- [.NET Core SDK](https://dotnet.microsoft.com/download) (v7.0.307) - Verify by running `dotnet --version` ✔️
- [npm](https://www.npmjs.com/) (v9.8.1) - Verify by running `npm --version` ✔️

## Setup ⚙️

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MathiasCK/discussions_vite_dotnet.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd discussions_vite_dotnet
   ```

3. **Install root & client dependencies**

   ```bash
   npm install
   ```

4. **Install server dependencies**

   ```bash
   npm run server:init
   ```

5. **Build server**

   ```bash
   npm run server:build
   ```

6. **Configure client proxy**

   On the root of the client repo add a file called `.env` and add the credentials:

   ```bash
   VITE_SERVER_URL=http://localhost:5250
   ```

7. **Configure server proxy**

   On the root of the server repo add a file called `env.config.json` and add the credentials:

   ```json
   {
     "EmailSettings": {
       "Username": "your_gmail_account",
       "Password": "your_gmail_app_password"
     },
     "SecretToken": "your_secret_base64_token",
     "Client_URL": "http://localhost:3000"
   }
   ```

   To generate a random SecretToken run `openssl rand -base64 32` from your command line

## Running the Project 🚀

### Development Mode 🔧

1. **Start both the server and client**:

   ```bash
   npm run start:dev
   ```

The server will be accessible at [http://localhost:5250](http://localhost:5250), and the client will be running on [http://localhost:3000](http://localhost:3000).

### Production Mode 🌐

1. **Build the client**:

   ```bash
   npm run client:build
   ```

2. **Start both the server and client**:

   ```bash
   npm start
   ```

The server will be accessible at [http://localhost:5250](http://localhost:5250), and the client will be running on [http://localhost:3000](http://localhost:3000).

## Testing 🧪

1. **Build the server**:

   ```bash
   npm run server:build
   ```

2. **Test the server**:

   ```bash
   npm run server:test
   ```

Tests for the server are located at `/server/Controllers/Tests`

## Usage 📖

- User Registration 📝: Sign up for an account using your email. Check your email for a verification link and complete the registration process.
- Log In 🔑: Log in to your account using your credentials.
- Explore Discussions 🔍: Browse existing discussions, read comments, and engage in conversations.
- Create Discussions ✍️: Share your thoughts by creating new discussions on topics that interest you.
- Manage Your Content 📋: Edit or delete your own discussions and comments as needed.

## Contributing 🤝

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes with clear messages.
- Push your changes to your fork.
- Create a pull request to the main branch of the original repository.

## License 📄

This project is licensed under the MIT License.
