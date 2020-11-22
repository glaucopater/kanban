import React from "react";
import { shallow } from "enzyme";
import { Column } from "./";

describe("Column", () => {
  const props = {
    category_tasks: [],
    category: "abc",
    createCard: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    removeCardFromColumn: jest.fn(),
  };
  const column = shallow(<Column {...props} />);
  it("renders properly", () => {
    expect(column).toMatchSnapshot();
  });
});
