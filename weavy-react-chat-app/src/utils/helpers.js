export const extractUrlFromText = (text) => text.match(/(https?:\/\/[^ ]*)/);

export const truncateText = (text, length) =>
    text.split(" ").slice(0, length).join(" ");