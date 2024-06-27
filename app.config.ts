import { ExpoConfig } from '@expo/config-types';
import 'dotenv/config';

const configEnv = {
  API_URL: process.env.API_URL,
  VERSION: process.env.VERSION,
};

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  extra: {
    ...configEnv,
  },
});
