/**
 * IConfig - Configuration object for the chatbot
 * @typedef {Object} IConfig
 * @property {string} [botName] - Name of the bot
 * @property {Array} initialMessages - Initial messages to display
 * @property {*} [state] - Bot state
 * @property {Object} [customComponents] - Custom React components
 * @property {Object} [customStyles] - Custom CSS styles
 * @property {Object} [customMessages] - Custom message templates
 * @property {Array} [widgets] - Custom widgets
 */

/**
 * ICustomComponents - Custom React components for the chatbot
 * @typedef {Object} ICustomComponents
 * @property {Function} [header] - Custom header component
 * @property {Function} [botAvatar] - Custom bot avatar component
 * @property {Function} [botChatMessage] - Custom bot message component
 * @property {Function} [userAvatar] - Custom user avatar component
 * @property {Function} [userChatMessage] - Custom user message component
 */

/**
 * ICustomMessage - Custom message type handlers
 * @typedef {Object} ICustomMessage
 */

/**
 * ICustomStyles - Custom styling for the chatbot
 * @typedef {Object} ICustomStyles
 * @property {Object} [botMessageBox] - Bot message box styling
 * @property {Object} [chatButton] - Chat button styling
 */

/**
 * IBackgroundColor - Background color styling
 * @typedef {Object} IBackgroundColor
 * @property {string} backgroundColor - Background color value
 */

const IConfig = {};

export { IConfig };
export default IConfig;
