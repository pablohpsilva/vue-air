<template>
  <div
    :class="inputFocusedClass"
    class="air-input-container">
    <label
      v-if="label"
      v-text="label"
      :for="id || name"
      :class="labelClass"
      class="air-input-label">
    </label>

    <input
      :class="inputClass"
      :value="inputValue"
      :max="max"
      :min="min"
      :disabled="disabled"
      :name="name"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      ref="input"
      @focus="handleFocus"
      @input="handleInput"
      @blur="handleBlur"
      @change="handleChange"
      aria-label="Email address"
      class="air-input"/>
  </div>
</template>

<script>
  export default {
    name: 'air-input',
    props: {
      name: String,
      type: String,
      icon: String,
      label: String,
      labelClass: {
        type: [String, Array, Object],
      },
      labelFocusClass: {
        type: [String, Array, Object],
      },
      placeholder: String,
      value: {},
      inputClass: {
        type: [String, Array, Object],
      },
      id: [String, Number],
      multiLine: {
        type: Boolean,
        default: false,
      },
      rows: {
        type: Number,
        default: 1,
      },
      rowsMax: Number,
      errorText: String,
      errorColor: String,
      helpText: String,
      helpTextClass: {
        type: [String, Array, Object],
      },
      maxLength: {
        type: Number,
        default: 0,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      fullWidth: {
        type: Boolean,
        default: false,
      },
      underlineShow: {
        type: Boolean,
        default: true,
      },
      underlineClass: {
        type: [String, Array, Object],
      },
      underlineFocusClass: {
        type: [String, Array, Object],
      },
      max: {
        type: [Number, String],
      },
      min: {
        type: [Number, String],
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isFocused: false,
        inputValue: this.value,
        charLength: 0,
      };
    },
    computed: {
      inputFocusedClass() {
        return {
          'air-focused': this.isFocused,
        };
      },
      textFieldClass() {
        return {
          'focus-state': this.isFocused,
          'has-label': this.label,
          'no-empty-state': this.inputValue,
          'has-icon': this.icon,
          'multi-line': this.multiLine,
          error: this.errorText,
          disabled: this.disabled,
          'full-width': this.fullWidth,
        };
      },
      float() {
        return this.labelFloat &&
          !this.isFocused &&
          !this.inputValue &&
          this.inputValue !== 0;
      },
      // errorStyle() {
      //   return {
      //     color: !this.disabled && this.errorText
      //       ? getColor(this.errorColor)
      //       : ''
      //   };
      // },
      showHint() {
        return !this.float && !this.inputValue && this.inputValue !== 0;
      },
    },
    components: {
      // icon,
      // underline,
      // 'enhanced-textarea': enhancedTextarea,
      // 'text-field-label': textFieldLabel,
      // 'text-field-hint': textFieldHint
    },
    watch: {
      value(val) {
        this.inputValue = val;
      },
      inputValue(val) {
        this.charLength = this.maxLength && String(this.inputValue)
          ? String(this.inputValue).length
          : 0;
        this.$emit('input', val);
      },
      charLength(val) {
        if (val > this.maxLength && !this.isTextOverflow) {
          this.isTextOverflow = true;
          this.$emit('textOverflow', true);
          this.$emit('text-overflow', true);
        }
        if (this.isTextOverflow && val <= this.maxLength) {
          this.isTextOverflow = false;
          this.$emit('textOverflow', false);
          this.$emit('text-overflow', false);
        }
      },
    },
    methods: {
      handleFocus(event) {
        this.isFocused = true;
        this.$emit('focus', event);
      },
      handleBlur(event) {
        this.isFocused = false;
        if (this.type === 'number' && !this.inputValue && this.inputValue !== 0 && this.$refs.input) {
          this.$refs.input.value = '';
        }
        this.$emit('blur', event);
      },
      handleInput(val) {
        this.inputValue = val.target ? val.target.value : val;
      },
      handleChange(e) {
        this.$emit('change', e, e.target.value);
      },
      handleLabelClick() {
        this.$emit('labelClick');
      },
      focus() {
        const { input, textarea } = this.$refs;
        if (input) {
          input.focus();
        } else if (textarea) {
          textarea.focus();
        }
      },
    },
  };
</script>

<style>
  .air-input-container {
    overflow: hidden;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-size: 19px;
    line-height: 24px;
    color: #484848;
    border: 1px solid #DBDBDB;
    border-radius: 2px;
    background-color: #ffffff;
    margin-bottom: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    transition: .36s all ease;
  }

  .air-input-container.air-focused {
    border: 1px solid #00A699;
    box-shadow: 0px 5px 10px -2px rgba(0,0,0,0.06);
  }

  .air-input:focus {
    outline: none;
  }

  .air-input-label {
    text-align: left;
    padding: 12px 12px 0px 12px;
    font-size: 14px;
  }

  .air-input {
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-size: 19px;
    line-height: 24px;
    /* border: 1px solid #DBDBDB; */
    color: #484848;
    font-weight: 300;
    background-color: transparent;
    border: 0px;
    padding: 11px;
    width: 100%;
    transition: .36s all ease;
  }
</style>
