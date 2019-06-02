import { mount } from "@vue/test-utils";
import { Debounced } from "../../src/component.js";

const tick = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));

const timeout = 20;

describe("Debounced", () => {
  test("Renders nothing without scoped slots", () => {
    const wrapper = mount(Debounced);
    expect(wrapper.text()).toBe("");
  });

  test("Passes value to a scoped slot", async () => {
    const wrapper = mount(Debounced, {
      scopedSlots: {
        default: `<p>{{props.value}}</p>`
      },
      propsData: {
        value: "One"
      }
    });
    await tick();
    expect(wrapper.text()).toBe("One");
  });

  test("Passes debounced value to a scoped slot", async () => {
    const wrapper = mount(Debounced, {
      scopedSlots: {
        default: `<p>{{props.debounced}}</p>`
      },
      propsData: {
        value: "One",
        timeout: 0
      }
    });
    await tick();
    expect(wrapper.text()).toBe("One");
  });

  test("Debounces value to a scoped slot", async () => {
    const wrapper = mount(Debounced, {
      scopedSlots: {
        default: `<p>{{props.debounced}}</p>`
      },
      propsData: {
        value: "One",
        timeout
      }
    });
    expect(wrapper.text()).toBe("One");
    wrapper.setProps({ value: "Two" });
    expect(wrapper.text()).toBe("One");
    await tick(timeout);
    expect(wrapper.text()).toBe("Two");
  });

  test("Sends debounced events", async () => {
    const wrapper = mount(Debounced, {
      propsData: {
        timeout
      }
    });
    wrapper.setProps({ value: "One" });
    expect(wrapper.emitted().input).toBeFalsy();
    await tick(timeout);
    expect(wrapper.emitted().input[0][0]).toBe("One");
  });

  test("Stores immediate value from scoped slots", () => {
    const wrapper = mount(Debounced, {
      scopedSlots: {
        default: `<button @click="props.setValue('One')">{{props.value}}</button>`
      },
      propsData: {
        timeout
      }
    });
    expect(wrapper.text()).toBe("");
    wrapper.find("button").trigger("click");
    expect(wrapper.text()).toBe("One");
  });

  test("Debounces value from scoped slots", async () => {
    const wrapper = mount(Debounced, {
      scopedSlots: {
        default: `<button @click="props.setValue('One')">{{props.debounced}}</button>`
      },
      propsData: {
        timeout
      }
    });
    expect(wrapper.text()).toBe("");
    wrapper.find("button").trigger("click");
    expect(wrapper.text()).toBe("");
    await tick(timeout);
    expect(wrapper.text()).toBe("One");
  });
});
