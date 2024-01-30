import { AutoComplete, Select } from 'antd';

type TOptionType = 'select' | 'autocomplete';

interface IKeyMap {
  value: any;
  text: string;
}

interface IParamsArray {
  source: any[];
  keyMap?: IKeyMap;
  optionType?: TOptionType;
}

const convert: any = (jsonobj: any, prefix: string) => {
  var newobj: any = {};

  const recurse: any = (o: any, p: any) => {
    for (var f in o) {
      if (o[f] && typeof o[f] === 'object') {
        newobj = recurse(o[f], (p ? p + '.' : '') + f);
      } else {
        newobj[(p ? p + '.' : '') + f] = o[f];
      }
    }
    return newobj;
  };

  return recurse(jsonobj, prefix);
};

export const array2options = (params: IParamsArray) => {
  const {
    source = [],
    keyMap = { value: 'value', text: 'text' },
    optionType = 'select',
  } = params;
  const { value, text } = keyMap;

  if (!source) return null;

  return source.map((item, key) => {
    let resultValue = item[value];
    let resultText = item[text];
    const optionValue = String(resultValue);
    if (optionType === 'autocomplete') {
      return (
        <AutoComplete.Option
          key={key}
          value={optionValue}
          item={item}
          title={resultText}
        >
          {resultText}
        </AutoComplete.Option>
      );
    } else {
      return (
        <Select.Option key={key} value={optionValue} item={item}>
          {resultText}
        </Select.Option>
      );
    }
  });
};

const str2array = (str: string) => {
  return str.split('.').map((item: any) => {
    if (/^\d+$/gi.test(String(item))) {
      return +item;
    } else {
      return item;
    }
  });
};

export const formatErrors = (
  errors: any = {},
  values: any,
  form: any,
  isSubmit?: boolean,
  isMultiSelect?: boolean,
) => {
  const result: any = [];
  let isScroll = false;
  const vals = convert(values);
  Object.keys(vals).forEach((key: any) => {
    result.push({
      key,
      name: isMultiSelect ? key.split('.')[0] : str2array(key),
      errors: [],
    });
  });

  if (errors) {
    errors.forEach((error: any) => {
      result.forEach((item: any, index: number) => {
        if (item.key === error.field) {
          result[index].errors.push(error.message[0]);
          if (!isScroll) {
            isScroll = true;
            if (typeof isSubmit === 'boolean' && isSubmit) {
              form.scrollToField(item.name);
            }
          }
        }
      });
    });
  }

  return result;
};
