# KnowYourRightsAI - Base Mini App

Your pocket guide to legal rights and police interactions with AI-powered guidance.

## Features

- **Interactive Rights Scripts**: Get tailored advice and scripts for common police interactions
- **Location-Specific Legal Insights**: Access state-specific laws and procedures
- **Secure Recording**: One-tap discreet recording with IPFS storage
- **Multilingual Support**: Available in multiple languages
- **Base Blockchain Integration**: Built as a Base Mini App with wallet connectivity

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **Storage**: IPFS via Pinata for secure evidence storage
- **AI**: OpenAI for dynamic script generation
- **Authentication**: Privy for secure wallet management

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   - OnchainKit API key for Base integration
   - OpenAI API key for AI-powered features
   - Pinata API keys for IPFS storage
   - Other service API keys as needed

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Core Components

### AppShell
Main application layout with navigation and floating background elements.

### FeatureCard
Reusable card component for displaying app features with icons and descriptions.

### RecordButton
Secure audio recording component with playback functionality.

### LegalScriptView
Displays legal scripts with tabs for different types of guidance (script, do's, don'ts).

### ScenarioSelector
Interface for selecting different police interaction scenarios.

## API Integration

- **OpenAI**: Dynamic script generation based on scenarios and location
- **Pinata**: Secure IPFS storage for recorded evidence
- **Airstack**: Legal data and location-specific information
- **Base RPC**: Blockchain interactions and wallet management

## Design System

The app uses a dark theme with purple/blue gradients and glass morphism effects:

- **Colors**: Dark background with purple/pink accents
- **Typography**: Inter font with semantic text sizing
- **Components**: Glass cards with backdrop blur effects
- **Motion**: Smooth transitions with cubic-bezier easing

## Security Features

- Secure audio recording with local processing
- IPFS storage for tamper-proof evidence
- Encrypted data transmission
- Privacy-focused design with minimal data collection

## Legal Disclaimer

This app provides general legal information and should not be considered legal advice. Always consult with a qualified attorney for specific legal situations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
