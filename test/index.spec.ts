import Convo from '../src';

describe('index', () => {

  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = new Convo(message).getApiKey();

      expect(result).toMatch(message);
    });
  });

});
