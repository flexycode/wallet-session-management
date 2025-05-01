# Wallet Session Management Demo

This project demonstrates wallet session management with MetaMask and Trust Wallet integration using React, Convex, and Web3React.

## Features
- User authentication with Convex Auth
- MetaMask and Trust Wallet integration
- Configurable wallet session duration
- Automatic session expiration
- Real-time session status updates
- Support for multiple blockchain networks

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- MetaMask or Trust Wallet browser extension

## Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd wallet-session-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Copy the provided `.env.local` template and fill in your secrets:
   ```env
   CONVEX_DEPLOY_KEY=
   CONVEX_DEPLOYMENT=
   VITE_CONVEX_URL=
   CONVEX_OPENAI_API_KEY=
   CONVEX_OPENAI_BASE_URL=
   CONVEX_RESEND_API_KEY=
   JWKS=
   JWT_PRIVATE_KEY=
   RESEND_BASE_URL=
   SITE_URL=
   ```
   > **Note:** Do not commit your filled `.env.local` with secrets to source control.

2. Create a Convex deployment:
   ```bash
   npx convex dev
   ```
   This will create a new Convex deployment and save the deployment URL to `.env.local`.

## Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the URL shown in your terminal (e.g., `http://localhost:5173`).

## Usage
1. **Sign In**
   - Use the authentication form to sign in (username/password)
2. **Connect Wallet**
   - Use the UI to connect MetaMask or Trust Wallet
3. **Session Management**
   - Manage wallet sessions, see session expiration, and receive real-time updates.

## Clean Repository
- Remove the `.cursor` directory and `CHEF_README_2r52xq.md` before pushing to GitHub. These are not needed for the project and should not be tracked in source control.

## License
MIT

   - Click "Connect Wallet" to connect MetaMask or Trust Wallet
   - Choose your desired session duration (15 mins to 2 hours)
   - Approve the wallet connection in your wallet extension

3. **Session Management**
   - View your connected wallet address
   - See the wallet type (MetaMask or Trust Wallet)
   - Monitor the remaining session time
   - Manually disconnect when needed

## Project Structure

```
├── convex/
│   ├── schema.ts         # Database schema
│   ├── wallet.ts         # Wallet session management functions
│   └── auth.ts           # Authentication configuration
├── src/
│   ├── components/
│   │   └── WalletConnect.tsx    # Wallet connection component
│   ├── lib/
│   │   └── web3.ts      # Web3 configuration and utilities
│   └── App.tsx          # Main application component
```

## Tech Stack

- [React](https://reactjs.org/) - Frontend framework
- [Convex](https://www.convex.dev/) - Backend and real-time database
- [Web3React](https://github.com/Uniswap/web3-react) - Ethereum wallet integration
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [date-fns](https://date-fns.org/) - Date formatting

## Supported Networks

The application supports the following networks:
- Ethereum Mainnet (Chain ID: 1)
- Ropsten (Chain ID: 3)
- Rinkeby (Chain ID: 4)
- Goerli (Chain ID: 5)
- Kovan (Chain ID: 42)
- BSC Mainnet (Chain ID: 56)
- BSC Testnet (Chain ID: 97)

## Security Features

- Automatic session expiration
- Secure authentication with Convex Auth
- Real-time session validation
- Automatic wallet disconnection on session expiry

## Development Notes

- The project uses TypeScript for type safety
- Real-time updates are handled automatically by Convex
- Wallet sessions are stored in the Convex database
- The UI updates automatically when the session expires

## Troubleshooting

1. **Wallet Not Connecting**
   - Ensure MetaMask or Trust Wallet is installed
   - Check if you're signed into your wallet
   - Verify you're on a supported network

2. **Session Issues**
   - Clear your browser cache
   - Disconnect and reconnect your wallet
   - Check your wallet's network connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
# wallet-session-management
