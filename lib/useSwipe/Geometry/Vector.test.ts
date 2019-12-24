import { Vector, direction, magnitude } from "./Vector";

describe("Vector.direction", () => {
  test("when the vector goes up", () => {
    const vector: Vector = [
      [0, 0],
      [0, 10],
    ];
    expect(direction(vector)).toEqual(0);
  });

  test("when the vector goes right", () => {
    const vector: Vector = [
      [0, 0],
      [10, 0],
    ];
    expect(direction(vector)).toEqual(90);
  });

  test("when the vector goes down", () => {
    const vector: Vector = [
      [0, 0],
      [0, -10],
    ];
    expect(direction(vector)).toEqual(180);
  });

  test("when the vector goes left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, 0],
    ];
    expect(direction(vector)).toEqual(270);
  });

  test("when the vector goes up and right", () => {
    const vector: Vector = [
      [0, 0],
      [10, 10],
    ];
    expect(direction(vector)).toEqual(45);
  });

  test("when the vector goes up and left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, 10],
    ];
    expect(direction(vector)).toEqual(315);
  });

  test("when the vector goes down and right", () => {
    const vector: Vector = [
      [0, 0],
      [10, -10],
    ];
    expect(direction(vector)).toEqual(135);
  });

  test("when the vector goes down and left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, -10],
    ];
    expect(direction(vector)).toEqual(225);
  });
});

describe("Vector.magnitude", () => {
  test("when the vector goes up", () => {
    const vector: Vector = [
      [0, 0],
      [0, 10],
    ];
    expect(magnitude(vector)).toEqual(10);
  });

  test("when the vector goes right", () => {
    const vector: Vector = [
      [0, 0],
      [10, 0],
    ];
    expect(magnitude(vector)).toEqual(10);
  });

  test("when the vector goes down", () => {
    const vector: Vector = [
      [0, 0],
      [0, -10],
    ];
    expect(magnitude(vector)).toEqual(10);
  });

  test("when the vector goes left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, 0],
    ];
    expect(magnitude(vector)).toEqual(10);
  });

  test("when the vector goes up and right", () => {
    const vector: Vector = [
      [0, 0],
      [10, 10],
    ];
    expect(magnitude(vector)).toEqual(14.142135623730951);
  });

  test("when the vector goes up and left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, 10],
    ];
    expect(magnitude(vector)).toEqual(14.142135623730951);
  });

  test("when the vector goes down and right", () => {
    const vector: Vector = [
      [0, 0],
      [10, -10],
    ];
    expect(magnitude(vector)).toEqual(14.142135623730951);
  });

  test("when the vector goes down and left", () => {
    const vector: Vector = [
      [0, 0],
      [-10, -10],
    ];
    expect(magnitude(vector)).toEqual(14.142135623730951);
  });
});
