import { getData } from "../services/DataService"

test('get the Financial Instruments data', () => {
    let data=getData();
    expect(data.length).toEqual(3);
})