import { Stack, Skeleton } from '@chakra-ui/react';
import { range } from 'lodash';
import useMessages from '../../hooks/messages/useMessages';
import { PER_PAGE } from '../Pagination';
import Message from './Message';

const Page = ({ page }: { page: number }) => {
    const { data } = useMessages(page, { sort: 'desc' });

    return (
        <Stack>
            {!data && range(PER_PAGE).map((i) => <Skeleton key={i} height="88px" />)}
            {data?.messages.map((message) => (
                <Message key={message.key} message={message} />
            ))}
        </Stack>
    );
};

export default Page;
