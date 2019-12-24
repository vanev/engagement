import {
  toCommon,
  eqDirection,
  semigroupDirection,
  between,
} from "./Direction";

describe("Direction.toCommon", () => {
  test("when the direction is less than -360", () => {
    expect(toCommon(-405)).toEqual(315);
  });

  test("when the direction is between -360 and 0", () => {
    expect(toCommon(-45)).toEqual(315);
  });

  test("when the direction is between 0 and 360", () => {
    expect(toCommon(135)).toEqual(135);
  });

  test("when the direction is greater than 360", () => {
    expect(toCommon(405)).toEqual(45);
  });
});

describe("Direction.eqDirection", () => {
  test("when both directions are less than -360", () => {
    expect(eqDirection.equals(-405, -405)).toBe(true);
    expect(eqDirection.equals(-405, -390)).toBe(false);
  });

  test("when one direction is less than -360, the other is between -360 and 0", () => {
    expect(eqDirection.equals(-405, -45)).toBe(true);
    expect(eqDirection.equals(-405, -70)).toBe(false);
  });

  test("when both directions are between -360 and 0", () => {
    expect(eqDirection.equals(-70, -70)).toBe(true);
    expect(eqDirection.equals(-70, -135)).toBe(false);
  });

  test("when one direction is between -360 and 0, the other is between 0 and 360", () => {
    expect(eqDirection.equals(-70, 290)).toBe(true);
    expect(eqDirection.equals(-70, 140)).toBe(false);
  });

  test("when both directions are between 0 and 360", () => {
    expect(eqDirection.equals(45, 45)).toBe(true);
    expect(eqDirection.equals(45, 135)).toBe(false);
  });

  test("when one direction is between 0 and 360, the other is greater than 360", () => {
    expect(eqDirection.equals(45, 405)).toBe(true);
    expect(eqDirection.equals(45, 450)).toBe(false);
  });

  test("when both directions are greater than 360", () => {
    expect(eqDirection.equals(405, 405)).toBe(true);
    expect(eqDirection.equals(405, 495)).toBe(false);
  });
});

describe("Direction.semigroupDirection", () => {
  test("when both directions are less than -360", () => {
    expect(semigroupDirection.concat(-405, -390)).toBe(285);
  });

  test("when one direction is less than -360, the other is between -360 and 0", () => {
    expect(semigroupDirection.concat(-405, -30)).toBe(285);
  });

  test("when both directions are between -360 and 0", () => {
    expect(semigroupDirection.concat(-45, -30)).toBe(285);
  });

  test("when one direction is between -360 and 0, the other is between 0 and 360", () => {
    expect(semigroupDirection.concat(-45, 330)).toBe(285);
  });

  test("when both directions are between 0 and 360", () => {
    expect(semigroupDirection.concat(315, 330)).toBe(285);
  });

  test("when one direction is between 0 and 360, the other is greater than 360", () => {
    expect(semigroupDirection.concat(315, 690)).toBe(285);
  });

  test("when both directions are greater than 360", () => {
    expect(semigroupDirection.concat(675, 690)).toBe(285);
  });
});

describe("Direction.between", () => {
  test("when both directions are less than -360", () => {
    expect(between(-405, -675)(345)).toBe(true);
    expect(between(-405, -675)(15)).toBe(true);
    expect(between(-405, -675)(300)).toBe(false);
    expect(between(-405, -675)(60)).toBe(false);
  });

  test("when one direction is less than -360, the other is between -360 and 0", () => {
    expect(between(-405, -315)(345)).toBe(true);
    expect(between(-405, -315)(15)).toBe(true);
    expect(between(-405, -315)(300)).toBe(false);
    expect(between(-405, -315)(60)).toBe(false);
  });

  test("when both directions are between -360 and 0", () => {
    expect(between(-45, -315)(345)).toBe(true);
    expect(between(-45, -315)(15)).toBe(true);
    expect(between(-45, -315)(300)).toBe(false);
    expect(between(-45, -315)(60)).toBe(false);
  });

  test("when one direction is between -360 and 0, the other is between 0 and 360", () => {
    expect(between(-45, 45)(345)).toBe(true);
    expect(between(-45, 45)(15)).toBe(true);
    expect(between(-45, 45)(300)).toBe(false);
    expect(between(-45, 45)(60)).toBe(false);
  });

  test("when both directions are between 0 and 360", () => {
    expect(between(315, 45)(345)).toBe(true);
    expect(between(315, 45)(15)).toBe(true);
    expect(between(315, 45)(300)).toBe(false);
    expect(between(315, 45)(60)).toBe(false);
  });

  test("when one direction is between 0 and 360, the other is greater than 360", () => {
    expect(between(315, 405)(345)).toBe(true);
    expect(between(315, 405)(15)).toBe(true);
    expect(between(315, 405)(300)).toBe(false);
    expect(between(315, 405)(60)).toBe(false);
  });

  test("when both directions are greater than 360", () => {
    expect(between(675, 405)(345)).toBe(true);
    expect(between(675, 405)(15)).toBe(true);
    expect(between(675, 405)(300)).toBe(false);
    expect(between(675, 405)(60)).toBe(false);
  });
});
