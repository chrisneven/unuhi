import { ChakraProvider, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NextQueryParamProvider } from 'next-query-params';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

const App = ({ Component, pageProps }: AppProps) => (
    <NextQueryParamProvider>
        <SWRConfig>
            <ChakraProvider resetCSS>
                <Header>
                    <Heading>Unuhi</Heading>
                </Header>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ChakraProvider>
        </SWRConfig>
    </NextQueryParamProvider>
);

export default App;

const Container = styled.main`
    width: var(--chakra-sizes-full);
    max-width: 120ch;
    margin-inline: auto;
`;

const Header = styled.header`
    border-bottom: black solid 1px;
    height: 4rem;
    padding: 0 calc((100vw - 120ch) / 2);
    margin-inline: auto;
`;
