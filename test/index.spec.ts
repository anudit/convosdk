import { Convo } from '../src';

describe('index', () => {

  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = Convo(message);

      expect(result).toMatch(message);
    });
  });

});
