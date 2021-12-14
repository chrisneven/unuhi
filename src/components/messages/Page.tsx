import { Stack, Skeleton, Box, Text } from '@chakra-ui/react';
import { range } from 'lodash';
import useMessages from '../../hooks/messages/useMessages';
import { PER_PAGE } from '../Pagination';

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

export default Page;
