export const sum = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Incorrect parameter type');
    }
    return a + b;
}

export const subtract = async (a, b) => {
    return a - b;
}

export const multiply = (a, b) => {
    return a * b;
}

export const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}