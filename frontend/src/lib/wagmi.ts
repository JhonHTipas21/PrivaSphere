import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygonMumbai } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'VeritasID',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Obtener de walletconnect.com
  chains: [polygonMumbai],
  ssr: true,
});
