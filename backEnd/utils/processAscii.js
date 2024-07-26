function removeAnsiEscapeCodes(text) {
    const ansiEscapeRegex = /[\u001b\u009b][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[~0-9=<>cf-nqry]|\d{1,6}|\d{3,4}(?:;\d{0,4})?)|[\u0080-\u00ff\u0100-\u017f])/g;
    return text.replace(ansiEscapeRegex, '');
}
module.exports = { removeAnsiEscapeCodes }