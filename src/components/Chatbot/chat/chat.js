import React, { useState, useRef, useEffect } from 'react';
import ConditionallyRender from 'react-conditionally-render';

import UserChatMessage from '../userChatMessage/userChatMessage';
import ChatbotMessage from '../chatbotMessage/chabotMessage';

import {
    botMessage,
    userMessage,
    customMessage,
    createChatMessage,
} from './chatUtils';

import ChatIcon from '../../../Assets/icons/paper-plane.svg';

import './chat.css';

const Chat = ({
    state,
    setState,
    widgetRegistry,
    messageParser,
    parse,
    customComponents,
    actionProvider,
    botName,
    customStyles,
    headerText,
    customMessages,
    placeholderText,
    validator,
    disableScrollToBottom,
    messageHistory,
    actions,
    messageContainerRef,
}) => {
    const { messages } = state;

    const [input, setInputValue] = useState('');

    const scrollIntoView = () => {
        setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop =
                    messageContainerRef?.current?.scrollHeight;
            }
        }, 50);
    };

    useEffect(() => {
        if (disableScrollToBottom) return;
        scrollIntoView();
    });

    const showAvatar = (messages, index) => {
        if (index === 0) return true;

        const lastMessage = messages[index - 1];

        if (lastMessage.type === 'bot' && !lastMessage.widget) {
            return false;
        }
        return true;
    };

    const renderMessages = () => {
        return messages.map((messageObject, index) => {
            if (botMessage(messageObject)) {
                return (
                    <React.Fragment key={messageObject.id}>
                        {renderChatbotMessage(messageObject, index)}
                    </React.Fragment>
                );
            }

            if (userMessage(messageObject)) {
                return (
                    <React.Fragment key={messageObject.id}>
                        {renderUserMessage(messageObject)}
                    </React.Fragment>
                );
            }

            if (customMessage(messageObject, customMessages)) {
                return (
                    <React.Fragment key={messageObject.id}>
                        {renderCustomMessage(messageObject)}
                    </React.Fragment>
                );
            }
        });
    };

    const renderCustomMessage = (messageObject) => {
        const customMessage = customMessages[messageObject.type];

        const props = {
            setState,
            state,
            scrollIntoView,
            actionProvider,
            payload: messageObject.payload,
            actions,
        };

        if (messageObject.widget) {
            const widget = widgetRegistry.getWidget(messageObject.widget, {
                ...state,
                scrollIntoView,
                payload: messageObject.payload,
                actions,
            });
            return (
                <>
                    {customMessage(props)}
                    {widget ? widget : null}
                </>
            );
        }

        return customMessage(props);
    };

    const renderUserMessage = (messageObject) => {
        const widget = widgetRegistry.getWidget(messageObject.widget, {
            ...state,
            scrollIntoView,
            payload: messageObject.payload,
            actions,
        });
        return (
            <>
                <UserChatMessage
                    message={messageObject.message}
                    key={messageObject.id}
                    customComponents={customComponents}
                />
                {widget ? widget : null}
            </>
        );
    };

    const renderChatbotMessage = (messageObject, index) => {
        let withAvatar;
        if (messageObject.withAvatar) {
            withAvatar = messageObject.withAvatar;
        } else {
            withAvatar = showAvatar(messages, index);
        }

        const chatbotMessageProps = {
            ...messageObject,
            setState,
            state,
            customComponents,
            widgetRegistry,
            messages,
            actions,
        };

        if (messageObject.widget) {
            const widget = widgetRegistry.getWidget(chatbotMessageProps.widget, {
                ...state,
                scrollIntoView,
                payload: messageObject.payload,
                actions,
            });
            return (
                <>
                    <ChatbotMessage
                        customStyles={customStyles.botMessageBox}
                        withAvatar={withAvatar}
                        {...chatbotMessageProps}
                        key={messageObject.id}
                    />
                    <ConditionallyRender
                        condition={!chatbotMessageProps.loading}
                        show={widget ? widget : null}
                    />
                </>
            );
        }

        return (
            <ChatbotMessage
                customStyles={customStyles.botMessageBox}
                key={messageObject.id}
                withAvatar={withAvatar}
                {...chatbotMessageProps}
                customComponents={customComponents}
                messages={messages}
                setState={setState}
            />
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validator && typeof validator === 'function') {
            if (validator(input)) {
                handleValidMessage();
                if (parse) {
                    return parse(input);
                }
                messageParser.parse(input);
            }
        } else {
            handleValidMessage();
            if (parse) {
                return parse(input);
            }
            messageParser.parse(input);
        }
    };

    const handleValidMessage = () => {
        setState((state) => ({
            ...state,
            messages: [...state.messages, createChatMessage(input, 'user')],
        }));

        scrollIntoView();
        setInputValue('');
    };

    const customButtonStyle = { backgroundColor: '' };
    if (customStyles && customStyles.chatButton) {
        customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
    }

    let header = `Conversation with ${botName}`;
    if (headerText) {
        header = headerText;
    }

    let placeholder = 'Write your message here';
    if (placeholderText) {
        placeholder = placeholderText;
    }

    return (
        <div className="react-chatbot-kit-chat-container">
            <div className="react-chatbot-kit-chat-inner-container">
                <ConditionallyRender
                    condition={!!customComponents.header}
                    show={
                        customComponents.header && customComponents.header(actionProvider)
                    }
                    elseShow={
                        <div className="react-chatbot-kit-chat-header">{header}</div>
                    }
                />

                <div
                    className="react-chatbot-kit-chat-message-container"
                    ref={messageContainerRef}
                >
                    <ConditionallyRender
                        condition={
                            typeof messageHistory === 'string' && Boolean(messageHistory)
                        }
                        show={
                            <div
                                dangerouslySetInnerHTML={{ __html: messageHistory }}
                            />
                        }
                    />

                    {renderMessages()}
                    <div style={{ paddingBottom: '15px' }} />
                </div>

                <div className="react-chatbot-kit-chat-input-container">
                    <form
                        className="react-chatbot-kit-chat-input-form"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="react-chatbot-kit-chat-input"
                            placeholder={placeholder}
                            value={input}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            className="react-chatbot-kit-chat-btn-send"
                            style={customButtonStyle}
                        >
                            <ChatIcon className="react-chatbot-kit-chat-btn-send-icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;