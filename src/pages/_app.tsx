import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import ReactGA from 'react-ga';

import '../styles/global.css';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
ReactGA.initialize('G-CTMHXKMPFL');

const customTheme = extendTheme({ config });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={customTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
