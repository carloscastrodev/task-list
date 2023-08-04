import { applyPossessiveCase } from '@/utils';

describe(`@/utils - applyPossessiveCase`, () => {
  test('It should apply possessiive case to names ending with "s" correctly', () => {
    const nameEndingWithS = 'Carlos';
    const expected = "Carlos'";

    const withPossessiveCase = applyPossessiveCase(nameEndingWithS);

    expect(withPossessiveCase).toMatch(expected);
  });

  test('It should apply possessiive case to names that do not end with "s" correctly', () => {
    const nameNotEndingWithS = 'Carol';
    const expected = "Carol's";

    const withPossessiveCase = applyPossessiveCase(nameNotEndingWithS);

    expect(withPossessiveCase).toMatch(expected);
  });
});
