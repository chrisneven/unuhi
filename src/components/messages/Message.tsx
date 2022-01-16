import {
    Box,
    Button,
    Heading,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { Translation } from '@prisma/client';
import { Field, FieldProps, Formik } from 'formik';
import useLanguages from '../../hooks/languages/useLanguages';
import { Message as MessageType } from '../../pages/api/messages';
import FormWatcher from '../misc/FormWatcher';

interface Props {
    message: MessageType;
}

const findRelevantTranslation = (translations: Translation[], langId: number) =>
    translations.find((translation) => translation.languageId === langId);

const Message = ({ message }: Props) => {
    const { getButtonProps, getDisclosureProps, isOpen, onClose } = useDisclosure();
    const languages = useLanguages();
    return (
        <>
            <Box
                as="button"
                _hover={{ bg: 'gray.50' }}
                borderRadius="md"
                shadow="md"
                key={message.id}
                p={5}
                {...getButtonProps()}
            >
                <Text fontWeight="medium">{message.key}</Text>
                <Text color="gray.500">{message.translations[0].translation}</Text>
            </Box>

            <Modal size="5xl" {...getDisclosureProps({ isOpen, onClose })}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        <h2>Translations</h2>
                        <Heading as="h3" size="sm" color="gray.400">
                            {message.key}
                        </Heading>
                    </ModalHeader>

                    <ModalBody>
                        <Formik
                            initialValues={{
                                translations: languages.data?.languages.map((language) => {
                                    const translation = findRelevantTranslation(message.translations, language.id);
                                    return translation?.translation ?? '';
                                }),
                            }}
                            onSubmit={(vals) => console.log(vals)}
                        >
                            {() => (
                                <Stack spacing={5}>
                                    <FormWatcher<{ translations: string[] }>
                                        watchCb={(bag) => bag.values.translations}
                                    />
                                    {languages.data?.languages.map((language, i) => {
                                        const translation = findRelevantTranslation(message.translations, language.id);
                                        return (
                                            <Field name={`translations.${i}`} key={language.id}>
                                                {({ field }: FieldProps) => (
                                                    <InputGroup>
                                                        <InputLeftAddon
                                                            borderColor={!translation ? 'orange.400' : undefined}
                                                        >
                                                            {language.flag}
                                                        </InputLeftAddon>
                                                        <Textarea {...field} borderTopLeftRadius="none" />
                                                    </InputGroup>
                                                )}
                                            </Field>
                                        );
                                    })}
                                </Stack>
                            )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Message;
