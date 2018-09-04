# ajv-error-messages

Normalise errors from ajv to a simpler format.

Takes ajv errors and returns a simpler object. Inspired by https://github.com/MauriceButler/jayschema-error-messages

## Fork support ES5

**This is a fork that ensure backward compatibility with ES5**, without providing a build folder. It basically makes it work with react-create-app, or anything that uses babel for building stuff.

To be added in your package.json:

`"ajv-error-messages": "git+ssh://git@github.com:StudyLink-fr/ajv-error-messages.git#v1.1.1",`

## Usage

```javascript
var normalise = require('ajv-error-messages');
var SchemaValidator = require('ajv');
var schemaValidator = SchemaValidator({ allErrors: true });

var schema = {
    description: 'test schema',
    type: 'object',
    additionalProperties: false,
    required: ['foo'],
    properties: {
        foo: {
            type: 'string',
        },
    },
};
var invalidData = {
    foo: 2,
};

var validator = schemaValidator.compile(schema);

function validatingData(data) {

    var valid = validator(data);
    var normalisedErrors;
    if (!valid) {
        var ajvErrors = validator.errors
        normalisedErrors = normalise(ajvErrors);
    }

    return valid || normalisedErrors;
}

console.log(JSON.stringify(validatingData(invalidData)));
```

results in

```
{
    fields: {
        'foo': ['Should be string']
    }
}
```
