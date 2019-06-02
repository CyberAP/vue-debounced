import debounce from "./debounce.js";

function convertVNodeArray(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes);
  return nodes[0];
}

export const Debounced = {
  name: "Debounced",
  props: {
    value: {
      validator() {
        return true;
      }
    },
    timeout: {
      type: Number,
      default: 250
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  data() {
    return {
      localValue: this.value,
      debouncedValue: this.value,
      debounce: debounce(val => {
        this.debouncedValue = val;
        this.$emit("input", val);
      }, this.timeout)
    };
  },
  watch: {
    value(newValue) {
      this.setLocalValue(newValue);
    }
  },
  methods: {
    setLocalValue(newValue) {
      this.localValue = newValue;
      this.debounce(newValue);
    }
  },
  render(h) {
    if (!this.$scopedSlots.default) return null;
    const node = this.$scopedSlots.default({
      debounced: this.debouncedValue,
      value: this.localValue,
      setValue: this.setLocalValue
    });
    return Array.isArray(node) ? convertVNodeArray(h, this.tag, node) : node;
  }
};