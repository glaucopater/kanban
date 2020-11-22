import React from "react";
import { shallow } from "enzyme";
import Column from "./Column";

describe("Column", () => {
  const props = {
    category_tasks: [],
    category: "abc",
    createCard: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    removeCardFromColumn: jest.fn(),
  };
  let column = shallow(<Column {...props} />);
  it("renders properly", () => {
    expect(column).toMatchSnapshot();
  });
});
