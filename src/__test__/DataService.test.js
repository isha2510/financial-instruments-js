import { getData } from "../services/DataService"

test('get the financial instruments data', () => {
    const result = getData();
    expect(result.length).toEqual(11);
})