import { NumberParam, useQueryParam, withDefault } from 'next-query-params';
import Page from '../components/messages/Page';
import Pagination from '../components/Pagination';
import useMessages from '../hooks/messages/useMessages';

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

export default Index;
