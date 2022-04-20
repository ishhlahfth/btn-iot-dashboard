const mixin = require('../../src/mixin');

describe('mixin', () => {
  it('test function translateStatus', () => {
    expect(mixin.default.methods.translateStatus('PENDING')).toMatch('Pending Verifikasi');
  });

  it('test function translateItemStatus', () => {
    expect(mixin.default.methods.translateItemStatus('AVAILABLE')).toMatch('Tersedia');
  });

  it('test function groupDigit', () => {
    expect(mixin.default.methods.groupDigit(1000)).toMatch('1.000');
  });

  it('test function convertToRp', () => {
    expect(mixin.default.methods.convertToRp(1000)).toMatch('Rp 1.000');
  });

  it('test function convertDateFormat', () => {
    expect(mixin.default.methods.convertDateFormat(new Date(), 'full')).toMatch('2022');
  });

  it('test function checkObjectBlank', () => {
    expect(mixin.default.methods.checkObjectBlank({})).toBeTruthy();
  });

  it('test function generatePhoneNumber', () => {
    expect(mixin.default.methods.generatePhoneNumber('081271062214')).toMatch('0812-7106-2214');
  });

  it('test function truncate', () => {
    const sampleInput = 'Something has always existed. According to physics, there can never be true physical nothingness—though there can be times when existence resembles nothing';
    const sampleOutput = 'Something has always existed';
    expect(mixin.default.methods.truncate(sampleInput)).toMatch(sampleOutput);
  });
});
