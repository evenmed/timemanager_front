import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Modal, { ModalBody, ModalFooter } from "../Modal";

describe("<Modal/>", () => {
  it("renders with proper class", () => {
    const hideModal = jest.fn();
    const wrapper = shallow(
      <Modal title="Test title" active={false} hideModal={hideModal}>
        <p>Child</p>
      </Modal>
    );
    expect(toJSON(wrapper)).toMatchSnapshot(); // Shouldn't have "show" class
    wrapper.setProps({ active: true });
    expect(toJSON(wrapper)).toMatchSnapshot(); // Should have "show" class
  });
  it("calls hideModal function when necessary", () => {
    const hideModal = jest.fn();
    const wrapper = mount(
      <Modal title="Test title" active={true} hideModal={hideModal}>
        <p>Child</p>
      </Modal>
    );

    // Test that it's called with close btn
    const closeBtn = wrapper.find("button.close");
    expect(closeBtn).toHaveLength(1);
    closeBtn.simulate("click");
    expect(hideModal).toHaveBeenCalledTimes(1);

    // Test that it's called when bg is clicked
    const modalDiv = wrapper.find(".modal");
    expect(modalDiv).toHaveLength(1);
    modalDiv.simulate("click");
    expect(hideModal).toHaveBeenCalledTimes(2);

    // Make sure it isn't called when children are clicked
    const modalDialog = wrapper.find(".modal-dialog");
    expect(modalDialog).toHaveLength(1);
    modalDialog.simulate("click");
    expect(hideModal).toHaveBeenCalledTimes(2);
  });
});

describe("<ModalBody/>", () => {
  it("renders properly", () => {
    const wrapper = shallow(
      <ModalBody>
        <p>Some nice content</p>
      </ModalBody>
    );

    expect(wrapper.text()).toContain("Some nice content");
    const bodyTag = wrapper.find(".modal-body");
    expect(bodyTag).toHaveLength(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe("<ModalFooter/>", () => {
  it("renders properly", () => {
    const wrapper = shallow(
      <ModalFooter>
        <p>Some nice footer content</p>
      </ModalFooter>
    );

    expect(wrapper.text()).toContain("Some nice footer content");
    const footerTag = wrapper.find(".modal-footer");
    expect(footerTag).toHaveLength(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
