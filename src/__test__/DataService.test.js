import { getData } from "../services/DataService";
import financialData from "../utils/data.json";

test('get the Financial Instruments data', () => {
    let data=getData();
    expect(data.length).toEqual(financialData.length);
})