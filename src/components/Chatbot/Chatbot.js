import React from 'react';

import Chat from './chat/chat';

import ChatbotError from './chatbotError/chatbotError';

import {
    getCustomStyles,
    getCustomComponents,
    getBotName,
    getCustomMessages,
    isConstructor,
} from './util';

import useChatbot from '../../hook/userChatbot';
import { createChatBotMessage } from './chat/chatUtils';

const Chatbot = ({
    actionProvider,
    messageParser,
    config,
    headerText,
    placeholderText,
    saveMessages,
    messageHistory,
    runInitialMessagesWithHistory,
    disableScrollToBottom,
    validator,
    ...rest
}) => {
    const {
        configurationError,
        invalidPropsError,
        ActionProvider,
        MessageParser,
        widgetRegistry,
        messageContainerRef,
        actionProv,
        messagePars,
        state,
        setState,
    } = useChatbot({
        config,
        actionProvider,
        messageParser,
        messageHistory,
        saveMessages,
        runInitialMessagesWithHistory,
        ...rest,
    });

    if (configurationError) {
        return <ChatbotError message={configurationError} />;
    }

    if (invalidPropsError.length) {
        return <ChatbotError message={invalidPropsError} />;
    }

    const customStyles = getCustomStyles(config);
    const customComponents = getCustomComponents(config);
    const botName = getBotName(config);
    const customMessages = getCustomMessages(config);

    if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
        return (
            <Chat
                state={state}
                setState={setState}
                widgetRegistry={widgetRegistry}
                actionProvider={actionProv}
                messageParser={messagePars}
                customMessages={customMessages}
                customComponents={{ ...customComponents }}
                botName={botName}
                customStyles={{ ...customStyles }}
                headerText={headerText}
                placeholderText={placeholderText}
                validator={validator}
                messageHistory={messageHistory}
                disableScrollToBottom={disableScrollToBottom}
                messageContainerRef={messageContainerRef}
            />
        );
    } else {
        return (
            <ActionProvider
                state={state}
                setState={setState}
                createChatBotMessage={createChatBotMessage}
            >
                <MessageParser>
                    <Chat
                        state={state}
                        setState={setState}
                        widgetRegistry={widgetRegistry}
                        actionProvider={ActionProvider}
                        messageParser={MessageParser}
                        customMessages={customMessages}
                        customComponents={{ ...customComponents }}
                        botName={botName}
                        customStyles={{ ...customStyles }}
                        headerText={headerText}
                        placeholderText={placeholderText}
                        validator={validator}
                        messageHistory={messageHistory}
                        disableScrollToBottom={disableScrollToBottom}
                        messageContainerRef={messageContainerRef}
                    />
                </MessageParser>
            </ActionProvider>
        );
    }
};

export default Chatbot;