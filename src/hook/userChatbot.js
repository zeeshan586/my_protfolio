import React, { useRef, useState, useEffect } from 'react';
import {
    createClientMessage,
    createChatBotMessage,
    createCustomMessage,
} from '../components/Chatbot/chat/chatUtils';
import {
    getInitialState,
    getWidgets,
    isConstructor,
    validateProps,
} from '../components/Chatbot/util';
import WidgetRegistry from '../components/WidgetRegistry/WidgetRegistry';

const useChatbot = ({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    runInitialMessagesWithHistory,
    saveMessages,
    ...rest
}) => {
    // Validate inputs - DO NOT RETURN EARLY
    let configurationError = '';
    let invalidPropsError = '';
    let hasError = false;

    if (!config || !actionProvider || !messageParser) {
        configurationError =
            'I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?';
        hasError = true;
    }

    // Initialize defaults
    let initialState = {};
    if (!hasError) {
        const propsErrors = validateProps(config, messageParser);

        if (propsErrors.length) {
            invalidPropsError = propsErrors.reduce((prev, cur) => {
                prev += cur;
                return prev;
            }, '');
            hasError = true;
        }

        if (!hasError) {
            initialState = getInitialState(config);

            if (messageHistory && Array.isArray(messageHistory)) {
                config.initialMessages = [...messageHistory];
            } else if (typeof messageHistory === 'string' && Boolean(messageHistory)) {
                if (!runInitialMessagesWithHistory) {
                    config.initialMessages = [];
                }
            }
        }
    }

    // All hooks MUST be called unconditionally - before any return
    const [state, setState] = React.useState(
        config && config.initialMessages
            ? {
                messages: [...config.initialMessages],
                ...initialState,
            }
            : { messages: [] }
    );
    const messagesRef = React.useRef(state.messages);
    const stateRef = React.useRef();
    const messageContainerRef = React.useRef();

    useEffect(() => {
        messagesRef.current = state.messages;
    });

    useEffect(() => {
        if (messageHistory && Array.isArray(messageHistory) && !hasError) {
            setState((prevState) => ({
                ...prevState,
                messages: messageHistory,
            }));
        }
    }, []);

    useEffect(() => {
        const refValue = messageContainerRef.current;

        return () => {
            if (saveMessages && typeof saveMessages === 'function' && refValue) {
                const HTML = refValue.innerHTML.toString();

                saveMessages(messagesRef.current, HTML);
            }
        };
    }, []);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // NOW we can return early if there was an error
    if (hasError) {
        return { configurationError, invalidPropsError };
    }

    let actionProv;
    let widgetRegistry;
    let messagePars;
    let widgets;

    const ActionProvider = actionProvider;
    const MessageParser = messageParser;

    if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
        actionProv = new actionProvider(
            createChatBotMessage,
            setState,
            createClientMessage,
            stateRef.current,
            createCustomMessage,
            rest
        );

        widgetRegistry = new WidgetRegistry(setState, actionProv);
        messagePars = new messageParser(actionProv, stateRef.current);

        widgets = getWidgets(config);
        widgets.forEach((widget) =>
            widgetRegistry?.addWidget(widget, rest)
        );
    } else {
        actionProv = actionProvider;
        messagePars = messageParser;
        widgetRegistry = new WidgetRegistry(setState, null);

        widgets = getWidgets(config);
        widgets.forEach((widget) =>
            widgetRegistry?.addWidget(widget, rest)
        );
    }

    return {
        widgetRegistry,
        actionProv,
        messagePars,
        configurationError,
        invalidPropsError,
        state,
        setState,
        messageContainerRef,
        ActionProvider,
        MessageParser,
    };
};

export default useChatbot;