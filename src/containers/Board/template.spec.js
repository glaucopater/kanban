import React from "react";
import { Board } from "./template";
import { shallow } from "enzyme";

describe("Board", () => {
  const props = {};
  let board = shallow(<Board {...props} />);
  it("renders properly", () => {
    expect(board).toMatchSnapshot();
  });
});
