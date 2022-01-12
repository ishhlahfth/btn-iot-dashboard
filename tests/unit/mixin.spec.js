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
    const sampleInput =
      'Something has always existed. According to physics, there can never be true physical nothingness—though there can be times when existence resembles nothing, such as a vacuum (the state of minimum possible energy) (Phys.org). Creating a space where there are no quantum fluctuations requires an enormous amount of energy, and there would be a remnant of that energy in that space afterwards if the fluctuations were flushed out, plus an unstable environment (1veritasium). Even on computers, deleted data is not actually tossed away, by rather written over. The fact that there can never be nothingness means the universe, and anything possibly beyond it, is eternal, as something has always been around. Whatever we consider to be before the Big Bang—God, the universe in infinitesimal form, or both—one thing is certain: it was there';
    const sampleOutput = 'Something has always existed';
    expect(mixin.default.methods.truncate(sampleInput)).toMatch(sampleOutput);
  });
});
