import { sum, subtract, divide } from '../calculator.js';

/**
 * Unit tests for calculator.js
 * 
 * The main focus of this file is not good unit test design, 
 * but showcasing Jest's features
 * 
 * @author  Arturo Mora-Rioja
 * @version 2.0.0 May 2026
 */

/**
 * Variable existence/function returns value
 */

test('variable has value', () => {
    const valueExists = sum(3, 5);

    expect(valueExists).toBeDefined();
});

test('variable does not have value', () => {
    const valueDoesNotExist = undefined;

    expect(valueDoesNotExist).not.toBeDefined();
});

test('function returns value', () => {
    const value = sum(3, 5);

    expect(value).toBeDefined();
});

/**
 * Numbers
 */

test('sum 3 and 8 equals 11', () => {
    const value = sum(3, 8);

    // Anti-pattern: several assertions per test
    // Broadly used in Jest, though
    expect(value).toBe(11);
    expect(value).toEqual(11);
    expect(value).not.toBeNaN();
});

test('sum 5 and 4', () => {
    const value = sum(5, 4);

    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(9);
    expect(value).toBeLessThan(15);
    expect(value).toBeLessThanOrEqual(9);
});

test('sum 3.4 and 4.5', () => {
    const value = sum(3.4, 4.5);

    expect(value).toBeCloseTo(7.9);     // Recommended, as it prevents rounding errors. 
                                        // The second parameter sets the precision (number of decimal places to check. Default 2)
    expect(value).toBe(7.9);
    expect(value).toEqual(7.9);
});

test('sum in object or array', () => {
    const value = {'calculation': 'first', '0.4 + 0.3': sum(0.47, 0.3)};

    expect(value).toEqual({
        'calculation': 'first',
        '0.4 + 0.3': expect.closeTo(0.77, 5)    // If the number is in an object or array, use closeTo() instead
    });
    expect(value).not.toEqual({
        'calculation': 'first',
        '0.4 + 0.3': expect.closeTo(0.8, 5)     // The second parameter sets the precision (number of decimal places to check)
    });
});

/**
 * Exceptions
 */

test('incorrect parameter type throws error', () => {
    expect(() => sum('a', 'b')).toThrow();                  // Notice that the function needs to be wrapped when invoked
    expect(() => sum('a', 'b')).toThrow(Error);
    expect(() => divide(5, 0)).toThrow('Division by zero'); // Error message
    expect(() => sum('a', 'b')).toThrow('parameter type');  // Part of the error message
});

/**
 * Async functions
 */

test('async function call', async () => {
    const value = await subtract(6, 2);

    expect(value).toBe(4);
});

/**
 * Data providers
 */
const sumData = [
    {'a': 3, 'b': 5, 'expected': 8},
    {'a': 0, 'b': 5, 'expected': 5},
    {'a': 3, 'b': -5, 'expected': -2},
    {'a': 14, 'b': 209, 'expected': 223},
    {'a': 0, 'b': 0, 'expected': 0},
    {'a': -4, 'b': -5, 'expected': -9}
];
test.each(sumData)('sum must work', (number) => {
    expect(sum(number.a, number.b)).toBe(number.expected);
});

describe.each(sumData)('sum ', (number) => {
    test(`${number.a} and ${number.b} equals ${number.expected}`, () => {
        expect(sum(number.a, number.b)).toBe(number.expected);
    })
});

/**
 * Nested groups
 */
describe('outer describe', () => {
    describe('inner describe', () => {
        // "test" can be shortened to "it"
        it('test addition succeeds', () => {
            expect(sum(8, 4)).toBe(12);
        });

        it('test addition fails', () => {
            expect(sum(8, 4)).not.toBe(13);
        });
    }); 

    it('test subtraction', async () => {
        expect(await subtract(8, 4)).toBe(4);
    });
});