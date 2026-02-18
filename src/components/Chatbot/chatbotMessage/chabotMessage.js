import React, { useEffect, useState } from 'react';
import ConditionallyRender from 'react-conditionally-render';

import ChatbotMessageAvatar from './chatbotMessageAvtar/chatbotMessageAvtar';
import Loader from '../loader/loader';

import './chatbotMessage.css';
import { callIfExists } from '../chat/chatUtils';

const ChatbotMessage = ({
    message,
    withAvatar = true,
    loading,
    messages,
    customComponents,
    setState,
    customStyles,
    delay,
    id,
}) => {
    const [show, toggleShow] = useState(false);

    useEffect(() => {
        let timeoutId;
        const disableLoading = (
            messages,
            setState
        ) => {
            let defaultDisableTime = 750;
            if (delay) defaultDisableTime += delay;

            timeoutId = setTimeout(() => {
                const newMessages = [...messages].map(message => {
                    if (message.id === id) {
                        return { ...message, loading: false, delay: undefined };
                    }

                    return message;
                });

                // setState((state) => ({ ...state, messages: newMessages }));
            }, defaultDisableTime);
        };

        disableLoading(messages, setState);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [delay, id]);

    useEffect(() => {
        if (delay) {
            setTimeout(() => toggleShow(true), delay);
        } else {
            toggleShow(true);
        }
    }, [delay]);

    const chatBoxCustomStyles = { backgroundColor: '' };
    const arrowCustomStyles = { borderRightColor: '' };

    if (customStyles) {
        chatBoxCustomStyles.backgroundColor = customStyles.backgroundColor;
        arrowCustomStyles.borderRightColor = customStyles.backgroundColor;
    }

    return (
        <ConditionallyRender
            condition={show}
            show={
                <div className="react-chatbot-kit-chat-bot-message-container">
                    <ConditionallyRender
                        condition={withAvatar}
                        show={
                            <ConditionallyRender
                                condition={!!customComponents?.botAvatar}
                                show={callIfExists(customComponents?.botAvatar)}
                                elseShow={<ChatbotMessageAvatar />}
                            />
                        }
                    />

                    <ConditionallyRender
                        condition={!!customComponents?.botChatMessage}
                        show={callIfExists(customComponents?.botChatMessage, {
                            message,
                            loader: <Loader />,
                        })}
                        elseShow={
                            <div
                                className="react-chatbot-kit-chat-bot-message"
                                style={chatBoxCustomStyles}
                            >
                                <ConditionallyRender
                                    condition={loading}
                                    show={<Loader />}
                                    elseShow={<span>{message}</span>}
                                />
                                <ConditionallyRender
                                    condition={withAvatar}
                                    show={
                                        <div
                                            className="react-chatbot-kit-chat-bot-message-arrow"
                                            style={arrowCustomStyles}
                                        ></div>
                                    }
                                />
                            </div>
                        }
                    />
                </div>
            }
        />
    );
};

export default ChatbotMessage;