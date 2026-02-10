/**
 * IBaseMessage - Base message structure
 * @typedef {Object} IBaseMessage
 * @property {string} message - Message content
 * @property {string} type - Message type (bot/user/custom)
 * @property {number} id - Unique message ID
 */

/**
 * IMessageOptions - Additional message options
 * @typedef {Object} IMessageOptions
 * @property {boolean} [loading] - Whether message is loading
 * @property {string} [widget] - Associated widget name
 * @property {number} [delay] - Delay before showing message
 * @property {*} [payload] - Custom payload data
 */

/**
 * IMessage - Complete message object
 * @typedef {Object} IMessage
 * @property {string} message - Message content
 * @property {string} type - Message type
 * @property {number} id - Unique message ID
 * @property {Object} [options] - Additional options
 * @property {boolean} [loading] - Loading state
 * @property {string} [widget] - Widget name
 * @property {number} [delay] - Delay value
 * @property {boolean} [withAvatar] - Show avatar
 * @property {*} [payload] - Payload data
 */

const IBaseMessage = {};
const IMessageOptions = {};
const IMessage = {};

export { IBaseMessage, IMessageOptions, IMessage };
