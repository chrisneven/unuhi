import { Box, Skeleton, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { range } from 'lodash';
import { NumberParam, useQueryParam, withDefault } from 'next-query-params';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Pagination from '../components/Pagination';
import { GetMessagesResponse, GetMessageVariables } from './api/messages';

const PER_PAGE = 12;

const fetcher = (url: string, params: GetMessageVariables) =>
    axios.get<GetMessagesResponse | null>(url, { params }).then((res) => res.data);

const useMessages = (currentPage: number) => {
    const router = useRouter();
    return useSWR(
        router.isReady && ['/api/messages', { skip: Math.max(currentPage - 1, 0) * PER_PAGE, take: PER_PAGE }],
        fetcher
    );
};

const Index: React.FC = () => {
    const [currentPage] = useQueryParam('page', withDefault(NumberParam, 1));
    const { data } = useMessages(currentPage);
    const count = data?.count ?? 0;

    return (
        <div>
            {/* prefetch nextpage */}
            <div style={{ display: 'none' }}>
                <Page page={currentPage + 1} />
            </div>
            <Page page={currentPage} />
            <Pagination count={count} />
        </div>
    );
};

const Page = ({ page }: { page: number }) => {
    const { data } = useMessages(page);

    return (
        <Stack>
            {!data && range(PER_PAGE).map((i) => <Skeleton key={i} height="88px" />)}
            {data?.messages.map((message) => (
                <Box _hover={{ bg: 'gray.50' }} borderRadius="md" shadow="md" key={message.id} p={5}>
                    <Text fontWeight="medium">{message.key}</Text>
                    <Text color="gray.500">{message.translations[0].translation}</Text>
                </Box>
            ))}
        </Stack>
    );
};
export default Index;
