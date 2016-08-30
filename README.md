# ajv-error-messages

Normalise errors from ajv to a simpler format.

Takes ajv errors and returns a simpler object. Inspired by https://github.com/MauriceButler/jayschema-error-messages

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
    if (!valid) {
        var ajv-errors = validator.errors
        var normalisedErrors = normalise(ejv-errors);
    }

    return valid || normalisedErrors;
}

console.log(JSON.stringify(validatingData(invalid)));
```

results in

```
{
    fields: {
        'foo': 'Should be string'
    }
}
```
