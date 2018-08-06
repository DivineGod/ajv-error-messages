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
        required: ['foo', 'arrayThing'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string',
            },
            arrayThing: {
                type: 'array',
                items: [
                    { type: 'string', },
                    { type: 'integer', },
                ],
                minItems: 2,
                maxItems: 2,
            },
        },
    };
    var testData = {
        foo: 1,
        arrayThing: [123,'123',{}],
    };
    var expectedErrors = {
        fields: {
            foo: ['Should be string'],
            arrayThing: ['Should NOT have more than 2 items'],
            'arrayThing[0]': ['Should be string'],
            'arrayThing[1]': ['Should be integer'],
        },
    };

    var validator = schemaValidator.compile(testSchema);
    var isValid = validator(testData);
    var normalisedErrors = normalise(validator.errors);
    t.notOk(isValid, 'validation failed');
    t.deepEqual(normalisedErrors, expectedErrors, 'correctly normalised errors');
});

test('should work with root array', function(t) {
    t.plan(2);

    var testSchema = {
        description: 'test schema',
        type: 'array',
        items: [
            { type: 'string', },
            { type: 'integer', },
        ],
        minItems: 2,
        maxItems: 2,
    };
    var testData = [123,'123',{}];

    var expectedErrors = {
        fields: {
            '': ['Should NOT have more than 2 items'],
            '[0]': ['Should be string'],
            '[1]': ['Should be integer'],
        },
    };

    var validator = schemaValidator.compile(testSchema);
    var isValid = validator(testData);
    var normalisedErrors = normalise(validator.errors);
    t.notOk(isValid, 'validation failed');
    t.deepEqual(normalisedErrors, expectedErrors, 'correctly normalised errors');
});
