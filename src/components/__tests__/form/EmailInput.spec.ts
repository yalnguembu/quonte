import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EmailInput from "../../form/EmailInput.vue";

describe("EmailInput", () => {
  const wrapper = mount(EmailInput, {
    props: {
      label: "Email adress",
      placeholder: "Enter your email adress",
      error: "",
      modelValue: "",
    },
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have the awaited label", () => {
    expect(wrapper.find("label").text()).toBe("Email adress");
  });

  it("should have awaited the placeholder", () => {
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Enter your email adress"
    );
  });

  it("should have the awaited error message and the awaited design", async () => {
    expect(wrapper.find('[data-test="email-input-text-error"]').exists()).toBe(
      false
    );
    expect(
      wrapper.find('[data-test="email-input"] input').classes("border-red-500")
    ).toBe(false);

    await wrapper.setProps({
      error: "This field is required",
    });

    expect(
      wrapper.find('[data-test="email-input-error-message"]').exists()
    ).toBe(true);
    expect(wrapper.find('[data-test="email-input-error-message"]').text()).toBe(
      "This field is required"
    );
    expect(
      wrapper.find('[data-test="email-input"] div').classes("border-red-500")
    ).toBe(true);
  });

  it("should emit the awaited value after input", async () => {
    await wrapper.find("input").setValue("Hello");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue")?.length).toBe(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("Hello");
  });
});
