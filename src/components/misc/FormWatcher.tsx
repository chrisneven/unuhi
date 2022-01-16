/* eslint-disable no-console */
import { FormikContextType, useFormikContext } from 'formik';
import { useEffect } from 'react';

interface Props<T> {
    watchCb?: (context: FormikContextType<T>) => unknown;
}

const FormWatcher = <T,>({ watchCb }: Props<T>) => {
    const context = useFormikContext<T>();

    useEffect(() => {
        if (!watchCb) {
            console.log(context);
        } else {
            console.log(watchCb(context));
        }
    }, [context]);

    return null;
};

export default FormWatcher;
