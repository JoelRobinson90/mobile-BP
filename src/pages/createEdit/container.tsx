import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Toast } from '@/components/Toast';
import { changeDateFormat, revertChangeDateFormat } from '@/helpers/changeDateFormat';
import { formatDate } from '@/helpers/formatDate';
import { useRedirect } from '@/hooks/useRedirect';
import { BankProductProps, InfoApiProps } from '@/interfaces';
import { schema } from '@/pages/createEdit/schema';
import bankService from '@/services/bankService';
import { createEditStyles } from '@/styles';

const PlatformOS = Platform.OS === 'ios';

export const CreateEditContainer: FC = () => {
  const { setParamsAndGoBack, params } = useRedirect();
  const product: BankProductProps = params as BankProductProps;
  const { id, name, description, logo, date_release, date_revision } = product;

  const [infoApi, setInfoApi] = useState<InfoApiProps | null>();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { container, inner, title } = createEditStyles;

  const defaultDate = useMemo(() => formatDate(), []);

  const defaultValues = {
    id: id || '',
    name: name || '',
    description: description || '',
    logo: logo || '',
    date_release: date_release ? revertChangeDateFormat(date_release) : defaultDate.formattedDate,
    date_revision: date_revision
      ? revertChangeDateFormat(date_revision)
      : defaultDate.formattedNextYearDate,
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch, setValue, reset } = form;

  const releaseDate = date_release ? revertChangeDateFormat(date_release) : watch('date_release');

  if (releaseDate !== defaultDate.formattedDate && releaseDate.length === 10) {
    setValue('date_revision', formatDate(releaseDate).formattedNextYearDate);
  }

  const onSubmit = async (data: BankProductProps) => {
    const valid = id ? false : await bankService.verificationProduct(data.id);
    if (valid) {
      setInfoApi({ message: 'El ID ya existe', error: true });
    } else {
      setDisableButton(true);
      const copyDate = data;
      copyDate.date_release = changeDateFormat(data.date_release);
      copyDate.date_revision = changeDateFormat(data.date_revision);
      const info = id
        ? await bankService.editProduct(copyDate, id)
        : await bankService.newProduct(copyDate);
      setInfoApi(info);
      if (!id) reset();
      else {
        setParamsAndGoBack(copyDate);
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={PlatformOS ? 'padding' : 'position'}
        keyboardVerticalOffset={PlatformOS ? 130 : 0}
        style={container}>
        <Toast
          text={infoApi?.message}
          error={infoApi?.error}
          hiddenToast={() => {
            setInfoApi(null);
            setDisableButton(false);
          }}
        />
        <ScrollView style={inner}>
          <Text style={title}>Formulario de Registro</Text>
          <FormProvider {...form}>
            <Input editable={!id} label="ID" name="id" placeholder="123456" />
            <Input label="Nombre" name="name" placeholder="Tarjeta Crédito" />
            <Input label="Descripción" name="description" placeholder="Descripción..." multiline />
            <Input label="Logo" name="logo" placeholder="https://www.visa.jpg" />
            <Input
              label="Fecha Liberación"
              name="date_release"
              placeholder="01/01/1990"
              keyboardType="numeric"
              isDate
            />
            <Input
              label="Fecha Revisión"
              name="date_revision"
              placeholder="01/01/1991"
              keyboardType="numeric"
              editable={false}
            />
            {disableButton ? (
              <Text style={{ fontSize: 20, fontWeight: '600', paddingBottom: 30 }}>
                Cargando...
              </Text>
            ) : (
              <>
                <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
                {!id && <Button title="Reiniciar" type="cancel" onPress={() => reset()} />}
              </>
            )}
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
