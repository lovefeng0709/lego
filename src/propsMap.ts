import { TextComponentProps } from "./defaultProps";
export interface PropToForm {
  component: string;
  subComponent?: string;
  options?: {
    text: string;
    value: any;
  }[];
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  initalTransform?: (value: any) => any;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

export const mapPropsToForms: PropsToForms = {
  text: {
    component: "a-textarea",
    extraProps: { rows: 3 },
    text: "文本",
  },
  fontSize: {
    component: "a-input-number",
    text: "字号",
    initalTransform: (v: string) => parseInt(v),
  },
  lineHeight: {
    component: "a-slider",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    text: "行高",
    initalTransform: (v: string) => parseFloat(v),
  },
  textAlign: {
    component: "a-radio-group",
    subComponent: "a-radio-button",
    text: "对齐",
    options: [
      { value: "left", text: "左" },
      { value: "center", text: "中" },
      { value: "right", text: "右" },
    ],
  },
  fontFamily: {
    component: "a-select",
    subComponent: "a-select-option",
    text: "字体",
    options: [
      { value: "", text: "无" },
      { text: "宋体", value: '"SimSun","STSong"' },
      { text: "黑体", value: '"SimHei","STHeiti"' },
      { text: "楷体", value: '"KaiTi","STKaiti"' },
      { text: "仿宋", value: '"FangSong","STFangsong"' },
    ],
  },
};
