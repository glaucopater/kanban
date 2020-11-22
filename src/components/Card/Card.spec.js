import React from "react";
import Card from "./Card";
import { shallow } from "enzyme";

describe("Card", () => {
  const props = { id: 1, text: "abc" };
  const card = shallow(<Card {...props} />);
  it("renders properly", () => {
    expect(card).toMatchSnapshot();
  });
});
