## Prerequisites 📋

Before you begin, ensure you have met the following requirements:

- [Serve](https://www.npmjs.com/package/serve) (v14.2.1) - Verify by running `serve -v` ✔️
- [.NET Core SDK](https://dotnet.microsoft.com/download) (v7.0.307) - Verify by running `dotnet --version` ✔️
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (v1.22.19) - Verify by running `yarn --version` ✔️

## Setup ⚙️

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MathiasCK/discussions_vite_dotnet.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd discussions_vite_dotnet
   ```

3. **Install server dependencies**

   ```bash
   yarn server:init
   ```

4. **Install client dependencies**

   ```bash
   yarn client:init
   ```

5. **Configure smtp server**

   On the root of the server repo add a file called `env.config.json` and add the credentials:

   ```json
      "EmailSettings": {
         "Username": "your_gmail_account",
         "Password": "your_gmail_app_password"
      },
      "SecretToken": "your_secret_base64_token"
   ```

   To generate a random SecretToken run `openssl rand -base64 32` from your command line

## Running the Project 🚀

### Development Mode 🔧

To run the project in development mode using the custom scripts:

1. **Start both the server and client**:

   ```bash
   yarn start:dev
   ```

The server will be accessible at http://localhost:5000, and the client will be running on http://localhost:5173.

### Production Mode 🌐

To run the project in production mode using the custom scripts:

1. **Build the client**:

   ```bash
   yarn client:build
   ```

2. **Start both the server and client**:

   ```bash
   yarn start:prod
   ```

The server will be accessible at http://localhost:5000, and the client will be running on http://localhost:3000.

## Contributing 🤝

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes with clear messages.
- Push your changes to your fork.
- Create a pull request to the main branch of the original repository.

## License 📄

This project is licensed under the MIT License.
