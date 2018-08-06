function normaliseErrorMessages(errors) {
    var fields = errors.reduce(
        function (acc, e) {
            if (e.dataPath.length && e.dataPath[0] === '.') {
                acc[e.dataPath.slice(1)] = [e.message.toUpperCase()[0] + e.message.slice(1)];
            } else {
                acc[e.dataPath] = [e.message.toUpperCase()[0] + e.message.slice(1)];
            }
            return acc;
        },
        {}
    );

    return { fields };
}

module.exports = normaliseErrorMessages;
