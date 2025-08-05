# Token Sale Plugin

A plugin for managing token sale phases in the DAO governance application.

## Features

- **Sale List Page**: Displays historical, current, and future token sale phases
- **Sale Detail Page**: Shows detailed information about a specific sale phase and allows purchasing
- **Two Purchase Modes**: Buy by SEPT amount or by USDC amount
- **Real-time Calculation**: Automatically calculates the corresponding amount based on the selected mode
- **Wallet Integration**: Uses @reown/appkit for wallet connectivity and transaction signing
- **Mock Data Support**: Default to mock data with option to switch to real API

## Installation

The plugin is automatically installed when the application starts. To enable it, ensure the following environment variable is set:

```
NEXT_PUBLIC_TOKEN_SALE_PLUGIN_ADDRESS=0xYourTokenSalePluginAddress
```

## Usage

1. Navigate to the Token Sale section in the application
2. Browse through available sale phases
3. Click on a sale phase to view details
4. Select purchase mode (SEPT or USDC)
5. Enter the amount you wish to purchase
6. Click "Purchase" and confirm the transaction in your wallet

## Configuration

To switch between mock data and real API, modify the `useMock` parameter in the `useSales` and `useSale` hooks:

```typescript
// Use mock data
const { sales, isLoading, isError } = useSales(true);

// Use real API
const { sales, isLoading, isError } = useSales(false);
```

## Development

To contribute to the development of this plugin:

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run the development server with `pnpm dev`
4. Make changes to the plugin files
5. Test your changes
6. Submit a pull request

## License

MIT