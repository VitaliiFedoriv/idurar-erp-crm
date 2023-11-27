import { DatePicker, Input, Form, Select, InputNumber, Switch } from 'antd';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import useMoney from '@/settings/useMoney';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';

export default function DynamicForm({ fields, isUpdateForm = false }) {
  return (
    <>
      {Object.keys(fields).map((key) => {
        let field = fields[key];
        if ((isUpdateForm && !field.disableForUpdate) || !field.disableForForm) {
          field.name = key;
          field.type = field.type.toLowerCase();
          if (!field.label) field.label = key;
          return <FormElement key={key} field={field} />;
        }
      })}
    </>
  );
}

function FormElement({ field }) {
  const translate = useLanguage();
  const money = useMoney();

  const compunedComponent = {
    string: <Input autoComplete="off" />,
    email: <Input autoComplete="off" placeholder="Email" />,
    number: <InputNumber style={{ width: '100%' }} />,
    phone: <Input min={0} style={{ width: '100%' }} />,
    boolean: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    date: (
      <DatePicker
        placeholder={translate('select_date')}
        style={{ width: '100%' }}
        format={'DD/MM/YYYY'}
      />
    ),
    select: (
      <Select
        options={field.options}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      />
    ),
    tag: (
      <Select
        options={field.options}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      />
    ),
    array: (
      <Select
        options={field.options}
        mode={'multiple'}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      />
    ),
    async: (
      <SelectAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
      ></SelectAsync>
    ),
    search: (
      <AutoCompleteAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        searchFields={field.searchFields}
      ></AutoCompleteAsync>
    ),
    currency: (
      <InputNumber
        className="moneyInput"
        min={0}
        controls={false}
        addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
        addonBefore={money.currency_position === 'before' ? money.currency_symbol : null}
      />
    ),
  };

  return (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: field.type === 'email' ? 'email' : undefined,
        },
      ]}
      valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
    >
      {compunedComponent[field.type]}
    </Form.Item>
  );
}
