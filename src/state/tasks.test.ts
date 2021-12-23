import {div, mult, salaryReducer, sub, sum, sumAC} from "./tasks";

test('sum' , () => {
    //1. Тестовые данные
    const a: number = 570
    const b: number = 330
    //2. Выполнение тестируемого кода
    const result = sum(a, b)
    //3. Проверка ожидаемого результата
    expect(result).toBe(900)
})

test('sub' , () => {
    //1. Тестовые данные
    const a: number = 570
    const b: number = 5
    //2. Выполнение тестируемого кода
    const result = sub(a, b)
    //3. Проверка ожидаемого результата
    expect(result).toBe(565)
})

test('mult' , () => {
    //1. Тестовые данные
    const a: number = 500
    const b: number = 2
    //2. Выполнение тестируемого кода
    const result = mult(a, b)
    //3. Проверка ожидаемого результата
    expect(result).toBe(1000)
})

test('div' , () => {
    //1. Тестовые данные
    const a: number = 500
    const b: number = 2
    //2. Выполнение тестируемого кода
    const result = div(a, b)
    //3. Проверка ожидаемого результата
    expect(result).toBe(250)
})

test('salarySumReducer' , () => {
    const  sumAction = sumAC(330)
    expect(salaryReducer(570 , sumAction)).toBe(900)
})

test('salarySubReducer' , () => {
    expect(salaryReducer(570 , {type: 'sub' , payload: 5})).toBe(565)
})

test('salaryMultReducer' , () => {
    expect(salaryReducer(500 , {type: 'mult' , payload: 2})).toBe(1000)
})

test('salaryDivReducer' , () => {
    expect(salaryReducer(500 , {type: 'div' , payload: 2})).toBe(250)
})