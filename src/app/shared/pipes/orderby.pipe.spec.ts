import { OrderbyPipe } from './orderby.pipe';

describe('OrderbyPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderbyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return undefined if sessions is undefined', () => {
    const pipe = new OrderbyPipe();
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should return sessions sorted by date in ascending order', () => {
    const sessions = [
      { date: '01/01/2022', availability: 1, numberticket: 1 },
      { date: '02/01/2022', availability: 1, numberticket: 2 },
      { date: '03/01/2022', availability: 1, numberticket: 3 },
    ];
    const expectedSessions = [
      { date: '01/01/2022', availability: 1, numberticket: 1 },
      { date: '02/01/2022', availability: 1, numberticket: 2 },
      { date: '03/01/2022', availability: 1, numberticket: 3 },
    ];
    const pipe = new OrderbyPipe();
    expect(pipe.transform(sessions)).toEqual(expectedSessions);
  });

  it('should return sessions sorted by date in descending order', () => {
    const sessions = [
      { date: '01/01/2022', availability: 1, numberticket: 1 },
      { date: '03/01/2022', availability: 1, numberticket: 2 },
      { date: '02/01/2022', availability: 1, numberticket: 3 },
    ];
    const expectedSessions = [
      { date: '03/01/2022', availability: 1, numberticket: 2 },
      { date: '02/01/2022', availability: 1, numberticket: 3 },
      { date: '01/01/2022', availability: 1, numberticket: 1 },
    ];
    const pipe = new OrderbyPipe();
    expect(pipe.transform(sessions, 'desc')).toEqual(expectedSessions);
  });



});
