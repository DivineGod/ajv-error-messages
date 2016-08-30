function normaliseErrorMessages(errors) {
    var fields = errors.reduce(
        function (acc, e) {
            acc[e.dataPath.slice(1)] = [e.message.toUpperCase()[0] + e.message.slice(1)];
            return acc;
        },
        {}
    );

    return { fields };
}

module.exports = normaliseErrorMessages;
