var test = require('tape');
var normalise = require('../index');
var SchemaValidator = require('ajv');
var schemaValidator = new SchemaValidator({ allErrors: true });

test('normalise should exist', function (t) {
    t.plan(1);
    t.equal(typeof normalise, 'function', 'normalise is a function');
});

test('should normalise errors', function(t) {
    t.plan(2);

    var testSchema = {
        description: 'test schema',
        type: 'object',
        required: ['foo'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string',
            },
        },
    };
    var testData = {
        foo: 1,
    };
    var expectedErrors = {
        fields: {
            foo: ['Should be string'],
        },
    };

    var validator = schemaValidator.compile(testSchema);
    var isValid = validator(testData);
    var normalisedErrors = normalise(validator.errors);
    t.notOk(isValid, 'validation failed');
    t.deepEqual(normalisedErrors, expectedErrors, 'correctly normalised errors');
});
