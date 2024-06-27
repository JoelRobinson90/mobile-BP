import { TextInputProps } from 'react-native';

type ButtonType = 'submit' | 'delete' | 'cancel';

export interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  isDate?: boolean;
}

export interface BankProductProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface MainButtonProps {
  title: string;
  type?: ButtonType;
  onPress: () => void;
}

export interface ItemProps {
  title: string;
  id: string;
  onPress: () => void;
}

export interface InfoApiProps {
  message: string;
  error: boolean;
}

export interface ToastProps {
  text?: string;
  error?: boolean;
  hiddenToast: () => void;
}

export interface ActionsheetProps {
  name: string;
  close: () => void;
  confirm: () => void;
}
