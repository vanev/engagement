import { Vector, direction, magnitude, eq, byMagnitude, ring } from "./Vector";

describe("Vector.direction", () => {
  test("when the vector goes up", () => {
    expect(direction([0, 10])).toEqual(0);
  });

  test("when the vector goes right", () => {
    expect(direction([10, 0])).toEqual(90);
  });

  test("when the vector goes down", () => {
    expect(direction([0, -10])).toEqual(180);
  });

  test("when the vector goes left", () => {
    expect(direction([-10, 0])).toEqual(270);
  });

  test("when the vector goes up and right", () => {
    expect(direction([10, 10])).toEqual(45);
  });

  test("when the vector goes up and left", () => {
    expect(direction([-10, 10])).toEqual(315);
  });

  test("when the vector goes down and right", () => {
    expect(direction([10, -10])).toEqual(135);
  });

  test("when the vector goes down and left", () => {
    expect(direction([-10, -10])).toEqual(225);
  });
});

describe("Vector.magnitude", () => {
  test("when the vector goes up", () => {
    expect(magnitude([0, 10])).toEqual(10);
  });

  test("when the vector goes right", () => {
    expect(magnitude([10, 0])).toEqual(10);
  });

  test("when the vector goes down", () => {
    expect(magnitude([0, -10])).toEqual(10);
  });

  test("when the vector goes left", () => {
    expect(magnitude([-10, 0])).toEqual(10);
  });

  test("when the vector goes up and right", () => {
    expect(magnitude([10, 10])).toEqual(14.142135623730951);
  });

  test("when the vector goes up and left", () => {
    expect(magnitude([-10, 10])).toEqual(14.142135623730951);
  });

  test("when the vector goes down and right", () => {
    expect(magnitude([10, -10])).toEqual(14.142135623730951);
  });

  test("when the vector goes down and left", () => {
    expect(magnitude([-10, -10])).toEqual(14.142135623730951);
  });
});

describe("Vector.eq", () => {
  const { equals } = eq;

  test("reflexivity", () => {
    const a: Vector = [1, 5];
    const b: Vector = [1, 5];
    expect(equals(a, b)).toBe(true);
  });

  test("symmetry", () => {
    const a: Vector = [1, 5];
    const b: Vector = [1, 5];
    expect(equals(a, b)).toBe(equals(b, a));
  });

  test("transitivity", () => {
    const a: Vector = [1, 5];
    const b: Vector = [1, 5];
    const c: Vector = [1, 5];
    expect(equals(a, b)).toBe(true);
    expect(equals(b, c)).toBe(true);
    expect(equals(a, c)).toBe(true);
  });
});

describe("Vector.byMagnitude", () => {
  const { compare } = byMagnitude;

  test("reflexivity", () => {
    const a: Vector = [1, 1];
    expect(compare(a, a)).toBeLessThanOrEqual(0);
  });

  test("antisymmetry", () => {
    const a: Vector = [1, 1];
    const b: Vector = [-1, -1];
    expect(compare(a, b)).toBeLessThanOrEqual(0);
    expect(compare(b, a)).toBeLessThanOrEqual(0);
    expect(magnitude(a)).toEqual(magnitude(b));
  });

  test("transitivity", () => {
    const a: Vector = [1, 1];
    const b: Vector = [-2, -2];
    const c: Vector = [-5, 5];
    expect(compare(a, b)).toBeLessThanOrEqual(0);
    expect(compare(b, c)).toBeLessThanOrEqual(0);
    expect(compare(a, c)).toBeLessThanOrEqual(0);
  });
});

describe("Vector.ring", () => {
  const { add, mul, sub, one, zero } = ring;

  test("associativity under addition", () => {
    const a: Vector = [1, 1];
    const b: Vector = [2, 4];
    const c: Vector = [0, 5];

    expect(add(add(a, b), c)).toEqual(add(a, add(b, c)));
  });

  test("identity under addition", () => {
    const a: Vector = [1, 1];

    expect(add(a, zero)).toEqual(a);
  });

  test("commutative under addition", () => {
    const a: Vector = [1, 1];
    const b: Vector = [2, 4];

    expect(add(a, b)).toEqual(add(b, a));
  });

  test("associativity under multiplication", () => {
    const a: Vector = [5, 4];
    const b: Vector = [2, 4];
    const c: Vector = [6, 5];

    expect(mul(mul(a, b), c)).toEqual(mul(a, mul(b, c)));
  });

  test("identity under multiplication", () => {
    const a: Vector = [5, 5];

    expect(mul(a, one)).toEqual(a);
  });

  test("multiplication left distributivity over addition", () => {
    const a: Vector = [5, 4];
    const b: Vector = [2, 4];
    const c: Vector = [6, 5];

    expect(mul(a, add(b, c))).toEqual(add(mul(a, b), mul(a, c)));
  });

  test("multiplication right distributivity over addition", () => {
    const a: Vector = [5, 4];
    const b: Vector = [2, 4];
    const c: Vector = [6, 5];

    expect(mul(add(a, b), c)).toEqual(add(mul(a, c), mul(b, c)));
  });

  test("annihilation", () => {
    const a: Vector = [5, 4];

    expect(mul(zero, a)).toEqual(zero);
  });

  test("additive inverse", () => {
    const a: Vector = [5, 4];

    expect(sub(a, a)).toEqual(add(sub(zero, a), a));
    expect(sub(a, a)).toEqual(zero);
  });
});
