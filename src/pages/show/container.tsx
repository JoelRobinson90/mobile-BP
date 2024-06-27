import { FC, useState } from 'react';
import { Text, View, Image } from 'react-native';

import { Actionsheet } from '@/components/Actionsheet';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useRedirect } from '@/hooks/useRedirect';
import { BankProductProps, InfoApiProps } from '@/interfaces';
import bankService from '@/services/bankService';
import { showStyles } from '@/styles';

export const ShowContainer: FC = () => {
  const [openActionsheet, setOpenActionsheet] = useState(false);
  const [infoApi, setInfoApi] = useState<InfoApiProps | null>();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { goTo, goBack, params } = useRedirect();
  const product: BankProductProps = params as BankProductProps;
  const { id, name, description, date_release, date_revision, logo } = product;
  const { container, inner, idText, infoContainer, infoLabel, infoValue, infoImage } = showStyles;

  const confirm = async () => {
    setDisableButton(true);
    setOpenActionsheet(false);
    const info = await bankService.deleteProduct(id);
    setInfoApi(info);
  };

  return (
    <>
      <View style={container}>
        <View style={inner}>
          <Text style={idText}>ID: {id}</Text>
          <Text>Información extra</Text>
          <View style={{ marginBottom: 60 }} />
          <View style={infoContainer}>
            <Text style={infoLabel}>Nombre:</Text>
            <Text style={infoValue}>{name}</Text>
          </View>
          <View style={infoContainer}>
            <Text style={infoLabel}>Descripción:</Text>
            <Text style={infoValue}>{description}</Text>
          </View>
          <View style={infoContainer}>
            <Text style={infoLabel}>Fecha Liberación:</Text>
            <Text style={infoValue}>{date_release}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={infoLabel}>Logo:</Text>
            <Image
              source={{ uri: logo }}
              defaultSource={require('@assets/default-source.jpg')}
              style={infoImage}
            />
          </View>

          <View style={infoContainer}>
            <Text style={infoLabel}>Fecha Revisión:</Text>
            <Text style={infoValue}>{date_revision}</Text>
          </View>
        </View>
        {!disableButton && (
          <View style={inner}>
            <Button title="Editar" type="cancel" onPress={() => goTo('CreateEdit', product)} />
            <View style={{ marginTop: 5 }} />
            <Button title="Eliminar" type="delete" onPress={() => setOpenActionsheet(true)} />
          </View>
        )}
      </View>
      {openActionsheet && (
        <Actionsheet name={name} close={() => setOpenActionsheet(false)} confirm={confirm} />
      )}
      <Toast
        text={infoApi?.message}
        error={infoApi?.error}
        hiddenToast={() => {
          setInfoApi(null);
          goBack();
        }}
      />
    </>
  );
};
