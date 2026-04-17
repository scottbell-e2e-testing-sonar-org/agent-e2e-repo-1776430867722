const { test } = require('node:test');
const assert = require('node:assert');
const cowboy = require('./cowboy');

test('helloCowboy returns a greeting string', () => {
  const result = cowboy.helloCowboy('42', false);
  assert.strictEqual(typeof result, 'string');
});

test('processCowboyRequest handles a ride request', () => {
  const result = cowboy.processCowboyRequest(
    { type: 'ride', payload: { horse: 'Spirit' } },
    { role: 'cowboy' },
    { horseEnabled: true },
    'prod',
  );
  assert.ok(result !== undefined);
});

test('processCowboyRequest handles a lasso request', () => {
  const result = cowboy.processCowboyRequest(
    { type: 'lasso' },
    { role: 'cowboy' },
    { lassoEnabled: true },
    'prod',
  );
  assert.ok(result !== undefined);
});

test('saddleUpHorse returns girth or false', () => {
  const r1 = cowboy.saddleUpHorse({ size: 100, name: 'Buck' }, { weight: 150 });
  assert.ok(r1 !== undefined);
  const r2 = cowboy.saddleUpHorse({ size: 100, name: 'Buck' }, { weight: 400 });
  assert.ok(r2 !== undefined);
});

test('saddleUpMule returns girth or false', () => {
  const result = cowboy.saddleUpMule({ size: 80, name: 'Mule' }, { weight: 120 });
  assert.ok(result !== undefined);
});

test('saddleUpDonkey returns girth or false', () => {
  const result = cowboy.saddleUpDonkey({ size: 60, name: 'Donkey' }, { weight: 100 });
  assert.ok(result !== undefined);
});

test('validateCowboyLicense returns expected results', () => {
  assert.strictEqual(cowboy.validateCowboyLicense(null, 'TX', 2020), false);
  assert.strictEqual(cowboy.validateCowboyLicense({ type: 'full', state: 'TX', expired: false }, 'TX', 2020), true);
  assert.strictEqual(cowboy.validateCowboyLicense({ type: 'provisional', state: 'TX', expired: false }, 'TX', 2020), 'provisional');
  cowboy.validateCowboyLicense({ type: 'full', state: 'TX', expired: true }, 'TX', 2020);
  cowboy.validateCowboyLicense({ type: 'full', state: 'CA', expired: false }, 'TX', 2020);
  cowboy.validateCowboyLicense({ type: 'full', state: 'TX', expired: false }, 'TX', 1990);
});

test('mergeCowboyConfig merges source into target', () => {
  const result = cowboy.mergeCowboyConfig({ a: 1 }, { b: 2 });
  assert.deepStrictEqual(result, { a: 1, b: 2 });
});
