function normaliseErrorMessages(errors) {
  console.log(errors);
  var fields = errors.reduce(function (acc, e) {
    if (e.instancePath.length && e.instancePath[0] === ".") {
      acc[e.instancePath.slice(1)] = [
        e.message.toUpperCase()[0] + e.message.slice(1),
      ];
    } else {
      acc[e.instancePath] = [e.message.toUpperCase()[0] + e.message.slice(1)];
    }
    return acc;
  }, {});

  return { fields };
}

module.exports = normaliseErrorMessages;
