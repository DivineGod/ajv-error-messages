function normaliseErrorMessages(errors) {
  var fields = errors.reduce(function (acc, e) {
    if (e.instancePath.length && e.instancePath[0] === "/") {
      let path = e.instancePath.slice(1);
      if (Number.isInteger(parseInt(path, 10))) {
        path = `/${path}`;
      }
      acc[path] = [e.message.toUpperCase()[0] + e.message.slice(1)];
    } else {
      acc[e.instancePath] = [e.message.toUpperCase()[0] + e.message.slice(1)];
    }
    return acc;
  }, {});

  return { fields };
}

module.exports = normaliseErrorMessages;
