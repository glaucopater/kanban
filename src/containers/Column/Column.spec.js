import React from "react";
import { shallow } from "enzyme";
import Column from "./Column";

describe("Column", () => {
  const props = { category_tasks: [] };
  let column = shallow(<Column {...props} />);
  it("renders properly", () => {
    expect(column).toMatchSnapshot();
  });
});
